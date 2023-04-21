import { Injectable } from '@angular/core';
import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { Login } from 'src/app/interfaces/login';
import { url } from './api-url';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private apiUrl = 'https://44.207.27.36/login'

  private apiUrl = url + 'login'

  constructor(private http: HttpClient) { }

  newLogin(loginUser: Login):Observable<Login>{
    return this.http.post<Login>(this.apiUrl, loginUser);
  }
}