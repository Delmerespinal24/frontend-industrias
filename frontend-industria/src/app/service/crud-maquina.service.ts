import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { InfoMaquina, MachinesResponse } from '../interfaces/info-maquina';

@Injectable({
  providedIn: 'root'
})
export class CrudMaquinaService {
  private apiUrlAgregarMaquina = 'http://ec2-52-71-59-232.compute-1.amazonaws.com:4000/machinery/add'
  private apiUrlObtenerMaquina = 'http://ec2-52-71-59-232.compute-1.amazonaws.com:4000/machinery'
  private apiUrlEliminarMaquina = 'http://ec2-52-71-59-232.compute-1.amazonaws.com:4000/machinery/delete'
  // private apiUrl = 'http://ec2-44-214-12-139.compute-1.amazonaws.com:4000/signupAdmin'
  // private apiUrl = 'http://ec2-52-71-59-232.compute-1.amazonaws.com:4000/signupAdmin'

  constructor(private http: HttpClient) { }

  newMachine(cliente: InfoMaquina):Observable<InfoMaquina>{
    return this.http.post<InfoMaquina>(this.apiUrlAgregarMaquina, cliente);
  }

  // getMachine():Observable<InfoMaquina[]>{
  //   return this.http.get<InfoMaquina[]>(this.apiUrlObtenerMaquina);
  // }

  getMachinery(): Observable<MachinesResponse> {
    return this.http.get<MachinesResponse>(this.apiUrlObtenerMaquina);
  }

  deleteMachine(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrlEliminarMaquina}/${id}`);
  }

  // getMachine(): Observable<any> {
  //   return this.http.get<any>(this.apiUrlObtenerMaquina).pipe(
  //     map(response => {
  //       if (Array.isArray(response)) {
  //         return response;
  //       } else {
  //         return [response];
  //       }
  //     })
  //   );
  // }
}
