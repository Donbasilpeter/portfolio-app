import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss']
})
export class PortfolioComponent implements OnInit {
  quantity:any = []
  @Input() allstocks:any;

  constructor() { }

  ngOnInit(): void {

  }
  quantityload(value:any){
    console.log(value)

  }

}
