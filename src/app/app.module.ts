import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AppMaterialModule } from './app.material.module';

import { MenuComponent } from './menu/menu.component';
import { IndexComponent } from './index/index.component';

import { LoginComponent } from './components/login/login.component';
import { CompanyMainComponent } from './components/company-main/company-main.component';
import { CompanySaveComponent } from './dialogs/company-save/company-save.component';
import { BookingSaveComponent } from './components/booking-save/booking-save.component';
import { DriverMainComponent } from './components/driver-main/driver-main.component';
import { DriverSaveComponent } from './dialogs/driver-save/driver-save.component';
import { DriverSearchComponent } from './dialogs/driver-search/driver-search.component';
import { BookingMainComponent } from './components/booking-main/booking-main.component';
import { BookingDetailsComponent } from './dialogs/booking-details/booking-details.component';
import { BillMainComponent } from './components/bill-main/bill-main.component';

@NgModule({
  declarations: [
    AppComponent,

    /* Utils Components */
    MenuComponent,
    IndexComponent,
    LoginComponent,

    /* Main Components */
    CompanyMainComponent,
    BookingSaveComponent,
    DriverMainComponent,
    BookingMainComponent,
    BillMainComponent,

    /* Dialog Components */
    CompanySaveComponent,
    DriverSaveComponent,
    DriverSearchComponent,
    BookingDetailsComponent,
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
  ],
  providers: [
    // { provide: HTTP_INTERCEPTORS, useClass: ProdInterceptorService, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
