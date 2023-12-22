import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AppMaterialModule } from './app.material.module';
import { MatIconModule } from '@angular/material/icon';

import { MenuComponent } from './menu/menu.component';
import { IndexComponent } from './index/index.component';

import { LoginComponent } from './components/login/login.component';

@NgModule({
  declarations: [
    AppComponent,

    MenuComponent,
    IndexComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: 'never' }),
    AppMaterialModule,
    CommonModule,
    MatIconModule
  ],
  providers: [
    // { provide: HTTP_INTERCEPTORS, useClass: ProdInterceptorService, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
