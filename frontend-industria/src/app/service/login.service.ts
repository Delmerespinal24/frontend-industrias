import { Injectable } from '@angular/core';
import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { Login } from 'src/app/interfaces/login';
import { url } from './api-url';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private apiUrl = url + 'login'
  private apiUrlSaas = url + 'LoginSaas'

  constructor(private http: HttpClient) { }

  newLogin(loginUser: Login):Observable<Login>{
    return this.http.post<Login>(this.apiUrl, loginUser);
  }

  newLoginSaas(loginUser: Login):Observable<Login>{
    return this.http.post<Login>(this.apiUrlSaas, loginUser);
  }
}