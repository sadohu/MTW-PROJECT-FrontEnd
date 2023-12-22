import { Injectable } from '@angular/core';
import { AppSettings } from '../app.settings';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Company } from '../models/company.model';

const url = AppSettings.COMPANY_SERVICE;

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(private http: HttpClient) { }

  getCompanies(filter: string): Observable<Company[]> {
    const params = new HttpParams().set("q", filter);
    return this.http.get<Company[]>(url + "/search?q=" + filter);
  }
}
