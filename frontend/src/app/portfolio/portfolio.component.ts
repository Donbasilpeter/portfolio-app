import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss']
})
export class PortfolioComponent implements OnInit {
  @Input() quantity:any = [];
   totalamount:number = 0;
   result : any =[];
   temp:any = 0;
  @Input() allstocks:any;

  constructor() { }

  ngOnInit(): void {
  
  }
  quantityload(){
    this.result = []
    for(let eachprice = 0; eachprice < (this.allstocks[0]).pricedata.length; eachprice++ ){
      this.allstocks.forEach((element:any = 0, index:any =0) => {
        this.temp = this.temp + (element.pricedata[eachprice]).price * this.quantity[index];
      });
      this.result.push({ month:this.allstocks[0].pricedata[eachprice].date.slice(5, 16) , price: this.temp })
      this.temp = 0;
    }
   
    
    

  }
  
  onChange(){
    this.totalamount = 0;
    this.allstocks.forEach((element:any, index:any) => {
      this.totalamount = this.totalamount + (element.pricedata[0]).price * this.quantity[index];
     
    });
 
    
  }

}
