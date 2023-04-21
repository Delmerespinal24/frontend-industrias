import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Compra } from '../interfaces/compra';
import { url } from './api-url';

@Injectable({
  providedIn: 'root'
})
export class CompraService {

  private apiUrl = url + '/purchase'

  constructor(private http: HttpClient) { }

  pagoTarjeta(compra: Compra):Observable<Compra>{
    return this.http.post<Compra>(this.apiUrl, compra);
  }

}