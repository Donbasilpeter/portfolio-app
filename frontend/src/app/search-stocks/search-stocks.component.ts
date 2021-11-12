import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { RequestService } from '../request.service';
import { startWith, map } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { DatePipe } from '@angular/common'
export const MY_DATE_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY'
  },
};

@Component({
  selector: 'app-search-stocks',
  templateUrl: './search-stocks.component.html',
  styleUrls: ['./search-stocks.component.scss'],
  providers: [
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS }
  ]
})
export class SearchStocksComponent implements OnInit {
  temparray:any = []
  // searchResult:any = []
  currentstocks:any = []
  quantity:any = []
  do:boolean = true;
  bsecode:any;
  stocks:any;
  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });
  myControl = new FormControl();
  filteredOptions: Observable<any> | undefined;

 
  private _filter(value:any) {

    const filterValue = value?.toLowerCase()
    // console.log(this.searchResult)
  
    // return this.stocks
   
    return this.stocks?.filter((option:any) => 
  
      option?.name?.toLowerCase().includes(filterValue)
    
      )
    
  }

  trackByFn(index:number,  item:any) {
    return item?.code;
  }  


  constructor(private request: RequestService,private datepipe: DatePipe) {
   
   }
  
  ngOnInit(): void {
    this.getbsecode();
    
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
    
  }

  displayFn(option: any) {
    
    // this.getdata(option.code,this.range.value['start'],this.range.value['end'])
    return option ? '' : '';
  }

  onSelectedStock(data:any){
    console.log(data)
    let selectedstock =  this.stocks.filter((x:any) => x.name == data)[0];
    console.log(selectedstock)
    let date = this.range.value
    let start =this.datepipe.transform(date['start'], "yyyy-MM-dd") || ''
    let end =this.datepipe.transform(date['end'], "yyyy-MM-dd") || ''
    console.log(date['start'].toString())
   
    this.getdata(selectedstock.code, start, end)
  }

  getbsecode(){
    this.request.getstocks().subscribe((data:any)=> {
      this.bsecode = data;
      this.stocks = data.data
    })
  }

  // getstocks(input:string){
  //   this.searchResult = []
  //   this.bsecode.data.forEach( (element:any) => {
  //     if(element.name.toLowerCase().includes(input.toLocaleLowerCase())){
  //       this.searchResult.push(element)
  //     }
      
  //   });
    
  // }



getdata(input:string,fromdate:string,todate:string){
  todate = todate.slice(0, 4) + todate.slice(5, 7) + todate.slice(8, 10);
  fromdate = fromdate.slice(0, 4) + fromdate.slice(5, 7) + fromdate.slice(8, 10);
  console.log(todate,fromdate)
  this.request.getdata(input,fromdate,todate).subscribe(data =>{

    let startprice = data.pricedata[0].price;
    this.currentstocks.forEach( (element:any) => {
      if(data.script_code == element.script_code){
        this.do = false;
      }
  });
  if(this.do){
    let pricedata:any = []
    data.pricedata.forEach((element:any,index:any) => {
      pricedata.push({date:element.date,price:element.price * 100/startprice,type:element.type})
    });
    this.currentstocks.push({name:data.name, pricedata: pricedata,script_code:data.script_code,startprice:startprice })
  
  
    this.quantity.push(0);
    
  }
  this.do = true;   

  })


}
    


  reset(fromdate:string,todate:string){
    this.temparray = []
    todate = todate.slice(0, 4) + todate.slice(5, 7) + todate.slice(8, 10);
    fromdate = fromdate.slice(0, 4) + fromdate.slice(5, 7) + fromdate.slice(8, 10);
    this.currentstocks.forEach((element:any) => {
      this.request.getdata(element.script_code,fromdate,todate).subscribe(data =>{
      let startprice = data.pricedata[0].price;
      let pricedata:any = [];
      data.pricedata.forEach((each:any,index:any) => {
        pricedata.push({date:each.date,price:each.price * 100/startprice,type:each.type})
      });
      this.temparray.push({name:data.name, pricedata: pricedata,script_code:data.script_code,startprice:startprice })
      
        });
    });
    this.currentstocks = this.temparray;

  }


}
