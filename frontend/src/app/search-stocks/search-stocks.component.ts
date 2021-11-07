import { Component, OnInit } from '@angular/core';
import { RequestService } from '../request.service';



@Component({
  selector: 'app-search-stocks',
  templateUrl: './search-stocks.component.html',
  styleUrls: ['./search-stocks.component.scss']
})
export class SearchStocksComponent implements OnInit {
  temparray:any = []
  tempquant: any = []
  searchResult:any = ""
  allstocks:any = []
  quantity:any = []

  constructor(private request: RequestService) { }

  ngOnInit(): void {
    this.getstocks("")
  }

  getstocks(input:string){
    this.request.getstocks(input).subscribe((data:any)=> {
      this.searchResult = data;
      this.searchResult =this.searchResult["data"]
    })
  }

  getdata(input:string,fromdate:string,todate:string){
    todate = todate.slice(0, 4) + todate.slice(5, 7) + todate.slice(8, 10);
    fromdate = fromdate.slice(0, 4) + fromdate.slice(5, 7) + fromdate.slice(8, 10);;
    this.request.getdata(input,fromdate,todate).subscribe(data =>{
     this.temparray.push(data)
     this.tempquant.push(0)
     this.allstocks = this.temparray
      this.quantity = this.tempquant
    })
    

  }

}
