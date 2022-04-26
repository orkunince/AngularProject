import { Router } from '@angular/router';
import { Bilgiler } from './../models/iuser';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  user = {
    userId: '',
    userName: '',
    userSurname: '',
    userEmail: '',
    userPhone: ''
  }

  userArr = []

  constructor(private router:Router) { }

  ngOnInit(): void {

  }

  fncSearch() {
    console.log(this.user.userName)
  }

  fncClear() {
    this.user.userId = ''
    this.user.userName = ''
    this.user.userSurname = ''
    this.user.userPhone = ''
    this.user.userEmail = ''
  }

  fncCreateCustomer() {
    this.router.navigate(['/customercreate'])
  }


}
