import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { IndexComponent } from './index/index.component';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [


  { path: '', component: IndexComponent },
  { path: 'index', component: IndexComponent },
  { path: 'login', component: LoginComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
