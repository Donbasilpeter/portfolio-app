import { Component, OnInit,Input,Output,EventEmitter  } from '@angular/core';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss']
})
export class PortfolioComponent implements OnInit {
  @Input() quantity:any = [];
  @Output() quantityChange = new EventEmitter<any>();
   totalamount:number = 0;
   result : any =[];
   temp:any = 0;
  @Input() currentstocks:any;
  @Output() currentstocksChange = new EventEmitter<any>();
  displayall:boolean =false;


  constructor() { }

  ngOnInit(): void {

  }
  quantityload(){
    let execute = true;
    this.result = []
    let arraysum:number = 0;
    for(let i = 0; i<this.quantity.length;i++){
      arraysum = Number(arraysum) + Number(this.quantity[i]);
  
    

    }
    this.quantity.forEach((element:any) => {
      if(element<0){
        execute =false;
      }
    });
    if(execute){
      
    if(!(arraysum-100 >0.5 || arraysum-100 <0.5) ){
      alert("Sum of quantity of all stocks must be 100. You have a difference of " + (arraysum -100) + "%");
    }
    else{
      
    for(let eachprice = 0; eachprice < (this.currentstocks[0]).pricedata.length; eachprice++ ){
      this.currentstocks.forEach((element:any = 0, index:any =0) => {
        this.temp = this.temp + element.pricedata[eachprice].price * this.quantity[index]/100;
      });
      this.result.push({ date:this.currentstocks[0].pricedata[eachprice].date.slice(5, 16) , portfolio: this.temp })
      this.temp = 0;
      
    }
    if(this.displayall){


      this.displayallstocks();
    }
    }
    }
    else{
      alert("no negative values");
    }
    
  }

  onchange(i:number){
    let sum = 0
    for(let start=0;start <=i; start++ ){
      sum = sum + this.quantity[start]
    }
    for(let start = i+1;start<this.quantity.length;start++){
      this.quantity[start] = (100 -sum)/(this.quantity.length -i-1); 
    }
  }
  remove(i:number){
    let val = this.quantity[i];
    for(let itrate = 0; itrate<this.quantity.length;itrate++){
      this.quantity[itrate] = this.quantity[itrate] + val/(this.quantity.length - 1) 
    
    }
    this.currentstocks.splice(i, 1);
    this.currentstocksChange.emit(this.currentstocks)
    this.quantity.splice(i, 1);
    this.quantityChange.emit(this.quantity)
    
  }


  displayallstocks(){
    let resultcopy:any = [];
   let eachdata:any ;
    this.result.forEach((element:any,index:any) => {
      this.currentstocks.forEach((stock:any) => {
        eachdata = element;
        eachdata[stock.name] =stock.pricedata[index].price
        resultcopy.push(eachdata) 
      });
    });
    this.result = resultcopy
    console.log(this.result)
  }
}
