import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  constructor(private http: HttpClient) { }
  getstocks(){
    return this.http.get<any>('http://127.0.0.1:5000/getcode')
 
  }
  getdata(code:string,fromdate:string,todate:string){
    return this.http.post<any>('http://127.0.0.1:5000/data', {  script_code: code, from_date: fromdate, to_date: todate })
 
  }
}
