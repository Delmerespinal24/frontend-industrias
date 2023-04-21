import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { InfoPagoAdmin } from '../interfaces/info-pago-admin';
import { url } from './api-url';

@Injectable({
  providedIn: 'root'
})
export class PagoService {


  private apiUrl = url + 'paymentPlan'


  constructor(private http: HttpClient) { }

  pagoTarjeta(pago: InfoPagoAdmin):Observable<InfoPagoAdmin>{
    return this.http.post<InfoPagoAdmin>(this.apiUrl, pago);
  }

}
