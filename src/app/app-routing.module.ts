import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { IndexComponent } from './index/index.component';
import { LoginComponent } from './components/login/login.component';
import { CompanyMainComponent } from './components/company-main/company-main.component';
import { BookingSaveComponent } from './components/booking-save/booking-save.component';
import { DriverMainComponent } from './components/driver-main/driver-main.component';
import { BookingMainComponent } from './components/booking-main/booking-main.component';
import { BillMainComponent } from './components/bill-main/bill-main.component';

const routes: Routes = [
  { path: 'company', component: CompanyMainComponent },
  { path: 'driver', component: DriverMainComponent },
  { path: 'booking', component: BookingMainComponent },
  { path: 'booking/company-list/:id', component: BookingMainComponent },
  { path: 'booking/:mode/:id', component: BookingSaveComponent },
  { path: 'bill', component: BillMainComponent },

  { path: '', component: LoginComponent },
  { path: 'index', component: IndexComponent },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
