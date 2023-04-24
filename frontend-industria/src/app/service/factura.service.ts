import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Factura } from '../interfaces/factura';
import { url } from './api-url';

@Injectable({
  providedIn: 'root'
})
export class FacturaService {

  private apiUrl = url + 'purchase/total'

  constructor(private http: HttpClient) { }

  obtenerFactura(factura: Factura):Observable<Factura>{
    return this.http.post<Factura>(this.apiUrl, factura);
  }

}