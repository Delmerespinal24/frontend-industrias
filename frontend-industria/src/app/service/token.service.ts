import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor(private http: HttpClient) { }

  getToken(): string {
    return localStorage.getItem('token')!;
  }

  RemoveToken(): void {
    localStorage.removeItem('token')!;
  }

  decodedToken(token: any): Observable<any> {
    return this.http.post<any>(
      'http://ec2-52-71-59-232.compute-1.amazonaws.com:4000/userData',
      token
    );
  }
}
