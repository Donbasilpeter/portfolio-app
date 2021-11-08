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
    this.currentstocks.forEach( (element:any) => {
      if(data.script_code == element.script_code){
        this.do = false;
      }
  });
  if(this.do){
    this.currentstocks.push(data);
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
        this.temparray.push(data);
  
        });
    });
    this.currentstocks = this.temparray;
  }


}
