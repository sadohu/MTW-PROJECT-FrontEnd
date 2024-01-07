import { Injectable } from '@angular/core';
import { AppSettings } from '../app.settings';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Bill } from '../models/bill.model';

const url = AppSettings.BILL_SERVICE;

@Injectable({
  providedIn: 'root'
})

export class BillService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Bill[]> {
    return this.http.get<Bill[]>(url);
  }

  // TODO: Esperar por el endpoint
  getAllByCompany(id: number): Observable<Bill[]> {
    return this.http.get<Bill[]>(url + '/company/' + id);
  }
}
