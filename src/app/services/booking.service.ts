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

  save(booking: Booking): Observable<any> {
    return this.http.post(url, booking);
  }
}
