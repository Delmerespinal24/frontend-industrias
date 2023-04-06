import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { InfoPagoAdmin } from '../interfaces/info-pago-admin';

@Injectable({
  providedIn: 'root'
})
export class PagoService {

  // private apiUrl = 'http://localhost:4000/paymentPlan'

  private apiUrl = 'http://ec2-52-71-59-232.compute-1.amazonaws.com:4000/paymentPlan'

  constructor(private http: HttpClient) { }

  pagoTarjeta(pago: InfoPagoAdmin):Observable<InfoPagoAdmin>{
    return this.http.post<InfoPagoAdmin>(this.apiUrl, pago);
  }

}
