import { SeoService } from './../services/seo.service';
import { IOrderList, OrderList } from './../models/IOrderList';
import { stUser } from './../../util';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
})
export class BasketComponent implements OnInit {

  products:OrderList[] = []
  constructor(private http: HttpClient, private seo:SeoService) { }

  //https://www.jsonbulut.com/json/orderList.php?ref=c7c2de28d81d3da4a386fc8444d574f2&musterilerID=12
  ngOnInit(): void {

    this.seo.updateTitle('Order')
      this.seo.updateMeta('content','Order Page seo alanı')

    const url = 'https://www.jsonbulut.com/json/orderList.php'
    const sendParams = {
      ref: '74430d47fa16b4c53c0fe59510752c70',
      musterilerID: stUser().userId
    }

    const newThis = this
    this.http.get<IOrderList>(url, { params: sendParams }).subscribe({
      next(res) {
        //console.log(res.orderList![0])
        newThis.products=res.orderList![0]
      },
      error(err) {
        console.log(err.message)
      }
    })
  }

}
