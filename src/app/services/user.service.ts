import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { Observable } from 'rxjs';
import { AppSettings } from '../app.settings';

const url = AppSettings.AUTH_SERVICE;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  loginUser(user: User): Observable<any> {
    return this.http.post(url + "/login", user);
  }
}
