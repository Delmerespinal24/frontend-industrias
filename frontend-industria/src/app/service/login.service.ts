import { Injectable } from '@angular/core';
import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { Login } from 'src/app/interfaces/login';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl = 'http://ec2-52-71-59-232.compute-1.amazonaws.com:4000//login'

  constructor(private http: HttpClient) { }

  newLogin(loginUser: Login):Observable<Login>{
    return this.http.post<Login>(this.apiUrl, loginUser);
  }
}