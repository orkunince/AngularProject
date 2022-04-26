import { RestService } from './../services/rest.service';
import { SeoService } from './../services/seo.service';
import { IOrder } from './../models/IOrder';
import { ToastrService } from 'ngx-toastr';
import { encrypt, decrypt, stUser } from './../../util';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { IProduct, ProBilgiler } from '../models/iproduct';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  faCartShopping = faCartShopping
  search = ''
  arr: ProBilgiler[] = []
  oldArr: ProBilgiler[] = []
  item: ProBilgiler = {}
  constructor(
    private http: HttpClient,
    public ngxSmartModalService: NgxSmartModalService,
    private toastr: ToastrService,
    private seo: SeoService,
    private rest: RestService
  ) {
    //encrypt("ali")
    //decrypt('U2FsdGVkX1+yi4a7L8xTSl14yLJdmKXvDnCf+/M7TzM=')
    //console.log(stUser().userId)
  }

  ngOnInit(): void {
    this.seo.updateTitle('Admin')
    this.seo.updateMeta('content', 'Admin Login Page seo alanı')

    const newThis = this
    this.rest.allProduct().subscribe({
      next(res) {
        //console.log('Gelen: '+ res)
        const bilgiler = res.Products[0].bilgiler;
        if (bilgiler) {
          newThis.arr = bilgiler
          newThis.oldArr = bilgiler
        }
      },
      error(err) {
        console.error(err.message)
      }
    })

  }

  fncSearch() {

    this.arr = this.oldArr
    const s = this.search.toLocaleLowerCase()
    //console.log(s)

    const filterGlobal = (item: ProBilgiler) => item.productName?.toLocaleLowerCase().includes(s) ||
      item.price?.toLocaleLowerCase().includes(s) || item.productId?.includes(s)

    this.arr = this.arr.filter(filterGlobal);

  }

  funcDetail(i: number) {
    this.item = this.arr[i]
  }

  //https://www.jsonbulut.com/json/orderForm.php?ref=c7c2de28d81d3da4a386fc8444d574f2&customerId=12&productId=12&html=12
  fncAddToCart(index: string) {
    const url = 'https://www.jsonbulut.com/json/orderForm.php'
    const sendParams = {
      ref: '74430d47fa16b4c53c0fe59510752c70',
      customerId: stUser().userId,
      productId: index,
      html: '12'
    }

    const newThis = this
    this.http.get<IOrder>(url, { params: sendParams }).subscribe({
      next(res) {
        console.log(res.order![0])
        const durum = res.order![0].durum
        if (durum) {
          newThis.toastr.success('Ürün sepete eklendi.')
          newThis.ngxSmartModalService.getModal('myModal').close()
        } else {
          newThis.toastr.error('Sipariş eklenemedi.')
        }
      },
      error(err) {
        newThis.toastr.error(err.message)
      }
    })

  }

}
