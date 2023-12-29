import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppSettings } from '../app.settings';
import { Observable } from 'rxjs';
import { Driver } from '../models/driver.model';

const url = AppSettings.DRIVER_SERVICE;

@Injectable({
  providedIn: 'root'
})
export class DriverService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Driver[]> {
    return this.http.get<Driver[]>(url);
  }

  getById(id: number): Observable<Driver> {
    return this.http.get<Driver>(`${url}/${id}`);
  }

  create(driver: Driver): Observable<any> {
    return this.http.post(url, driver);
  }

  update(driver: Driver): Observable<any> {
    return this.http.put(`${url}/${driver.idDriver}`, driver);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${url}/${id}`);
  }

}
