import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { AppSettings } from '../app.settings';
import { Observable } from 'rxjs';
import { Ubigeo } from '../models/ubigeo.model';
import { Currency } from '../models/currency.model';
import { Area } from '../models/area.model';

const urlRUC = AppSettings.API_APIPERU_RUC;
const urlDNI = AppSettings.API_APIPERU_DNI;
const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6ImxyMjcwNzIwMDFAZ21haWwuY29tIn0.uSeFR7UMIxYmAzZmllUAVPBZHFiqghwmoMYoFTbhTIo';

const urlUbigeo = AppSettings.UBIGEO_SERVICE;
const urlUbigeoLimaMetropolitana = `${urlUbigeo}/department/15/province/01`;

const urlCurrency = AppSettings.CURRENCY_SERVICE;
const urlArea = AppSettings.AREA_SERVICE;

@Injectable({
  providedIn: 'root'
})

export class UtilService {

  constructor(private http: HttpClient) { }

  searchRUC(ruc: string): Observable<any> {
    const params = new HttpParams().set("token", token);
    return this.http.get<any>(`${urlRUC}/${ruc}`, { params });
  }

  searchDNI(dni: string): Observable<any> {
    const params = new HttpParams().set("token", token);
    return this.http.get<any>(`${urlDNI}/${dni}`, { params });
  }

  getUbigeoLimaMetropolitana(): Observable<Ubigeo[]> {
    return this.http.get<Ubigeo[]>(urlUbigeoLimaMetropolitana);
  }

  getCurrencies(): Observable<Currency[]> {
    return this.http.get<Currency[]>(urlCurrency);
  }

  // TODO: Cambiar el idCompany por el id de la compañia seleccionada en el formulario Booking
  getAreasByCompany(idCompany: number): Observable<Area[]> {
    return this.http.get<Area[]>(urlArea);
  }

}
