import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { AppSettings } from '../app.settings';
import { Observable } from 'rxjs';

const urlRUC = AppSettings.API_APIPERU_RUC;
const urlDNI = AppSettings.API_APIPERU_DNI;
const token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6ImxyMjcwNzIwMDFAZ21haWwuY29tIn0.uSeFR7UMIxYmAzZmllUAVPBZHFiqghwmoMYoFTbhTIo';

@Injectable({
  providedIn: 'root'
})

export class UtilService {

  constructor(private http: HttpClient) { }

  searchRUC(ruc: string): Observable<any> {
    const params = new HttpParams().set("token", token);
    return this.http.get<any>(`${urlRUC}/${ruc}`, { params });
  }
}
