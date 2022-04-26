import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Bilgiler, User } from './../models/iuser';
import { Component, OnInit } from '@angular/core';
import { faEyeSlash, faEye } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-customercreate',
  templateUrl: './customercreate.component.html',
  styleUrls: ['./customercreate.component.css']
})
export class CustomercreateComponent implements OnInit {
  faEye = faEye
  user: Bilgiler = {
    userId: '',
    userName: '',
    userSurname: '',
    userEmail: '',
    userPhone: '',
    face: '',
    faceID: ''
  }
  password = ''

  constructor(
    private http: HttpClient,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
  }

  //https://www.jsonbulut.com/json/userRegister.php?
  //ref=c7c2de28d81d3da4a386fc8444d574f2&
  //userName=demo&userSurname=demo&userPhone=05333333333&userMail=a@a.com&userPass=123456
  fncRegister() {

    if (this.user.userName === undefined || this.user.userName === '') {
      this.toastr.error('Username is empty')
    } else if (this.user.userSurname === undefined || this.user.userSurname === '') {
      this.toastr.error('Surname is empty')
    } else if (this.user.userEmail === undefined || this.user.userEmail === '') {
      this.toastr.error('Email is empty')
    } else if (this.user.userPhone === undefined || this.user.userPhone === '') {
      this.toastr.error('Phone is empty')
    } else if (this.password === undefined || this.password === '') {
      this.toastr.error('Password is empty')
    } else {
      const url = 'https://www.jsonbulut.com/json/userRegister.php'
      const sendParams = {
        ref: '74430d47fa16b4c53c0fe59510752c70',
        userName: this.user.userName,
        userSurname: this.user.userSurname,
        userPhone: this.user.userPhone,
        userMail: this.user.userEmail,
        userPass: this.password
      }

      const newThis = this
      this.http.get<User>(url, { params: sendParams }).subscribe({
        next(res) {
          const durum = res.durum
          const mesaj = res.mesaj
          if (durum) {
            newThis.toastr.success('Kullanici basariyla oluşturuldu')
          } else {
            newThis.toastr.error('Kullanici olusturma islemi basarisiz!')
          }
        },
        error(err) {
          console.error(err.message)
        }
      })
    }
  }

}
