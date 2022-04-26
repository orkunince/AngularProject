import { CustomercreateComponent } from './customercreate/customercreate.component';
import { CustomerComponent } from './customer/customer.component';
import { RegisterComponent } from './users/register/register.component';
import { BasketComponent } from './basket/basket.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddressComponent } from './address/address.component';
import { AdminComponent } from './admin/admin.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'address', component: AddressComponent },
  { path: 'basket', component: BasketComponent },
  { path: 'customer', component: CustomerComponent },
  { path: 'customercreate', component: CustomercreateComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
