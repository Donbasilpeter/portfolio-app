import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SearchStocksComponent } from './search-stocks/search-stocks.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { FormsModule } from '@angular/forms';
import { GraphComponent } from './graph/graph.component';
import { 
	IgxCategoryChartModule,
	IgxLegendModule
 } from "igniteui-angular-charts";

@NgModule({
  declarations: [
    AppComponent,
    SearchStocksComponent,
    PortfolioComponent,
    GraphComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    IgxCategoryChartModule,
	  IgxLegendModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
