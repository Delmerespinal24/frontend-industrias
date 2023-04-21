import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { Filtro } from '../interfaces/filtro';
import { url } from './api-url';

@Injectable({
  providedIn: 'root'
})
export class FiltroService {
  private apiUrl = url + 'filter'

  constructor(private http: HttpClient) { }

  filtrar(filtro: Filtro):Observable<Filtro>{
    return this.http.post<Filtro>(this.apiUrl, filtro);
  }
}