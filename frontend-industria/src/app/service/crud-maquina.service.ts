import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { InfoMaquina } from '../interfaces/info-maquina';

@Injectable({
  providedIn: 'root'
})
export class CrudMaquinaService {
  private apiUrlAgregarMaquina = 'http://localhost:4000/machinery/add'
  // private apiUrl = 'http://ec2-44-214-12-139.compute-1.amazonaws.com:4000/signupAdmin'
  // private apiUrl = 'http://ec2-52-71-59-232.compute-1.amazonaws.com:4000/signupAdmin'

  constructor(private http: HttpClient) { }

  newMachine(cliente: InfoMaquina):Observable<InfoMaquina>{
    return this.http.post<InfoMaquina>(this.apiUrlAgregarMaquina, cliente);
  }

}
