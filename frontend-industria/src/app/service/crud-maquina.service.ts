import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { InfoMaquina, MachinesResponse } from '../interfaces/info-maquina';
import { url } from './api-url';

@Injectable({
  providedIn: 'root'
})
export class CrudMaquinaService {

  private apiUrlAgregarMaquina = url + '/machinery/add'
  private apiUrlObtenerMaquina = url + '/machinery'
  private apiUrlEliminarMaquina = url + '/machinery/delete'
  private apiUrlObtenerMaquinaId = url + '/machinery/machine'
  private apiUrlActualizarMaquina = url + '/machinery/edit'

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

  getMachine(idMaquina: string): Observable<any> {
    return this.http.get(`${this.apiUrlObtenerMaquinaId}/${idMaquina}`);
  }

  updateMachine(idMaquina:string, machine:InfoMaquina): Observable<any>{
    return this.http.put(`${this.apiUrlActualizarMaquina}/${idMaquina}`,machine);
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
