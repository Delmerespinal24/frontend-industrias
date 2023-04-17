import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { Filtro } from '../interfaces/filtro';

@Injectable({
  providedIn: 'root'
})
export class FiltroService {
  private apiUrl = 'http://localhost:4000/filter'
  // private apiUrl = 'http://ec2-52-71-59-232.compute-1.amazonaws.com:4000/filter'

  constructor(private http: HttpClient) { }

  filtrar(filtro: Filtro):Observable<Filtro>{
    return this.http.post<Filtro>(this.apiUrl, filtro);
  }
}