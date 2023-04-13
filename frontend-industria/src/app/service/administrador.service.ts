import { Injectable } from '@angular/core';
import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { Administrador } from '../interfaces/administrador';

@Injectable({
  providedIn: 'root'
})
export class AdministradorService {
  //private apiUrl = 'http://localhost:4000/signupAdmin'
  // private apiUrl = 'http://ec2-44-214-12-139.compute-1.amazonaws.com:4000/signupAdmin'
  private apiUrl = 'http://ec2-52-71-59-232.compute-1.amazonaws.com:4000/signupAdmin'

  constructor(private http: HttpClient) { }

  newAdmin(cliente: Administrador):Observable<Administrador>{
    return this.http.post<Administrador>(this.apiUrl, cliente);
  }
}
