import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { InfoPagoAdmin } from '../interfaces/info-pago-admin';

@Injectable({
  providedIn: 'root'
})
export class PagoService {

  private apiUrl = 'https://44.207.27.36/paymentPlan'

  // private apiUrl = 'http://localhost:4000/paymentPlan'
  // private apiUrl = 'http://ec2-44-214-12-139.compute-1.amazonaws.com:4000/signupAdmin'
  // private apiUrl = 'http://ec2-52-71-59-232.compute-1.amazonaws.com:4000/signupAdmin'

  constructor(private http: HttpClient) { }

  pagoTarjeta(pago: InfoPagoAdmin):Observable<InfoPagoAdmin>{
    return this.http.post<InfoPagoAdmin>(this.apiUrl, pago);
  }

}
