import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { url } from './api-url';

@Injectable({
  providedIn: 'root'
})
export class TokenClientService {

  constructor(private http: HttpClient) { }

  getToken(): string {
    return localStorage.getItem('token-festival')!;
  }

  RemoveToken(): void {
    localStorage.removeItem('token-festival')!;
  }

  decodedToken(token: any): Observable<any> {
    return this.http.post<any>(
      url + '/userData',
      token
    );
  }
}
