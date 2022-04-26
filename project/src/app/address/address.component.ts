import { SeoService } from './../services/seo.service';
import { IAddress } from './../models/iaddress';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { stUser, fncDateConvert } from './../../util';
import { Component, OnInit } from '@angular/core';
import { AddressList } from '../models/iaddress';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { NgxSmartModalService } from 'ngx-smart-modal';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent implements OnInit {
  faTrash = faTrash
  addres: AddressList = {}
  allAddress: AddressList[] = []
  modelAddress: AddressList = {}

  constructor(
    private http: HttpClient,
    private toastr: ToastrService,
    public ngxSmartModalService: NgxSmartModalService,
    public seo: SeoService
  ) { }

  ngOnInit(): void {
    this.seo.updateTitle('Address Page')
    this.seo.updateMeta('content', 'Address Page seo alani')

    this.fncAllAddress()
  }

  //https://www.jsonbulut.com/json/addressList.php?ref=c7c2de28d81d3da4a386fc8444d574f2&musterilerID=35
  //74430d47fa16b4c53c0fe59510752c70
  fncAllAddress() {

    if (stUser() != null) {
      const url = 'https://www.jsonbulut.com/json/addressList.php'
      const sendParams = {
        ref: '74430d47fa16b4c53c0fe59510752c70',
        musterilerID: stUser().userId
      }

      const newThis = this
      this.http.get<IAddress>(url, { params: sendParams }).subscribe({
        next(res) {
          //console.log(res)
          newThis.allAddress = res.addressList!
          //console.log(newThis.allAddress)
        },
        error(err) {
          console.error(err.message)
        }
      })
    }
  }


  // https://www.jsonbulut.com/json/addressAdd.php?ref=c7c2de28d81d3da4a386fc8444d574f2&musterilerID=35&il=istanbul&ilce=Be%C5%9Fikta%C5%9F&Mahalle=Barbaros&adres=Fatih%20NO.9&kapiNo=10&notBilgi=Kargo%20Bilgisi
  fncAddressAdd() {

    if (this.addres.il === undefined || this.addres.il === "") {
      this.toastr.error("İl bilgisi boş!")
    } else if (this.addres.ilce === undefined || this.addres.ilce === "") {
      this.toastr.error("İlçe bilgisi boş!")
    } else if (this.addres.Mahalle === undefined || this.addres.Mahalle === "") {
      this.toastr.error("Mahalle bilgisi boş!")
    } else if (this.addres.adres === undefined || this.addres.adres === "") {
      this.toastr.error("Acik adres bilgisi boş!")
    } else if (this.addres.kapiNo === undefined || this.addres.kapiNo === "") {
      this.toastr.error("Kapi no bilgisi boş!")
    } else if (this.addres.not === undefined || this.addres.not === "") {
      this.toastr.error("not bilgisi boş!")
    } else {
      
      // gerekli denetimler yukarıda yapıldı artık servis çağırılmalıdır.

      const url = 'https://www.jsonbulut.com/json/addressAdd.php'
      const sendParams = {
        ref: '74430d47fa16b4c53c0fe59510752c70',
        musterilerID: stUser().userId,
        il: this.addres.il!,
        ilce: this.addres.ilce!,
        Mahalle: this.addres.Mahalle!,
        adres: this.addres.adres!,
        kapiNo: this.addres.kapiNo!,
        notBilgi: this.addres.not!,
      }
      const newThis = this
      this.http.get(url, { params: sendParams }).subscribe({
        next(res) {
          console.log(res)
          newThis.fncAllAddress()
          newThis.toastr.success('Ekleme basarili.')
        },
        error(err) {
          newThis.toastr.error(err.message)
        }
      })
    }
  }

  //address detail ngx butonu ile detayları gösterme pop-up açılması
  funcDetail(index: number) {

    const item = this.allAddress[index]
    //console.log(item.tarih)
    if (item.tarih) {
      
      const newTarih = fncDateConvert(item.tarih.toString());
      item.tarih = newTarih
    }
    this.modelAddress = item
  }


  fncRemove(index: string) {
    
    if (stUser()) {
      const url = 'https://www.jsonbulut.com/json/addressDelete.php'
      const sendParams = {
        ref: '74430d47fa16b4c53c0fe59510752c70',
        musterilerID: stUser().userId,
        adresID: index
      }
      const newThis = this
      this.http.get(url, { params: sendParams }).subscribe({
        next(res) {
          newThis.fncAllAddress()
          // console.log(res)
        },
        error(err) {
          console.error(err.message)
        }
      })
    }
  }

  fncDeleteConfirm(id: string) {
    const verify = confirm("Are you sure!")
    if (verify) {
      this.fncRemove(id)
    }
  }
}
