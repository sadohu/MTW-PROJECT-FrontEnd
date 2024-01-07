import { Injectable } from '@angular/core';
import { AppSettings } from '../app.settings';
import { HttpClient } from '@angular/common/http';
import { Booking } from '../models/booking.model';
import { Observable } from 'rxjs';

const url = AppSettings.BOOKING_SERVICE;

@Injectable({
  providedIn: 'root'
})

export class BookingService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Booking[]> {
    return this.http.get<Booking[]>(url);
  }

  getById(id: number): Observable<Booking> {
    return this.http.get<Booking>(`${url}/${id}`);
  }

  getByCompany(id: number): Observable<Booking[]> {
    return this.http.get<Booking[]>(`${url}/company/${id}`);
  }

  save(booking: Booking): Observable<any> {
    return this.http.post(url, booking);
  }

  updateStatus(booking: Booking): Observable<any> {
    return this.http.put(url, booking);
  }
}
