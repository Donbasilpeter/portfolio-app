import { Component, OnInit } from '@angular/core';
import { RequestService } from '../request.service';


@Component({
  selector: 'app-search-stocks',
  templateUrl: './search-stocks.component.html',
  styleUrls: ['./search-stocks.component.scss']
})
export class SearchStocksComponent implements OnInit {
  temparray:any = []
  searchResult:any = []
  currentstocks:any = []
  quantity:any = []
  do:boolean = true;
  bsecode:any = ""
 
  

  constructor(private request: RequestService) { }
  
  ngOnInit(): void {
    this.getbsecode();
    
  }

  getbsecode(){
    this.request.getstocks().subscribe((data:any)=> {
      this.bsecode = data;
      this.getstocks("");
    })
  }

  getstocks(input:string){
    this.searchResult = []
    this.bsecode.data.forEach( (element:any) => {
      if(element.name.toLowerCase().includes(input.toLocaleLowerCase())){
        this.searchResult.push(element)
      }
      
    });
    
  }



getdata(input:string,fromdate:string,todate:string){
  todate = todate.slice(0, 4) + todate.slice(5, 7) + todate.slice(8, 10);
  fromdate = fromdate.slice(0, 4) + fromdate.slice(5, 7) + fromdate.slice(8, 10);
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
