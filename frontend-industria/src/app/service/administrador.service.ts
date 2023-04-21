import { Injectable } from '@angular/core';
import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { Administrador } from '../interfaces/administrador';
import { url } from './api-url';
@Injectable({
  providedIn: 'root'
})
export class AdministradorService {
  private apiUrl = url + '/signupAdmin'

  constructor(private http: HttpClient) { }

  newAdmin(cliente: Administrador):Observable<Administrador>{
    return this.http.post<Administrador>(this.apiUrl, cliente);
  }
}
