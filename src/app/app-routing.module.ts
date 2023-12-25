import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { IndexComponent } from './index/index.component';
import { LoginComponent } from './components/login/login.component';
import { CompanyMainComponent } from './components/company-main/company-main.component';
import { BookingSaveComponent } from './components/booking-save/booking-save.component';

const routes: Routes = [
  { path: 'company', component: CompanyMainComponent },
  { path: 'new-booking/:id', component: BookingSaveComponent },

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
