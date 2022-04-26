import { IProduct } from './../models/iproduct';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RestService {

  constructor(private http:HttpClient) { }
  baseUrl='https://www.jsonbulut.com/json/'

  //All Product
  allProduct(){
    const url=this.baseUrl+'product.php'
    const sendParams = {
      
      ref: '74430d47fa16b4c53c0fe59510752c70',
      start: '0'
    }

    return this.http.get<IProduct>(url,{params:sendParams})
  }


}
