import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { url } from './api-url';

@Injectable({
  providedIn: 'root'
})
export class ImagenService {
  private apiUrl = url + 'product/postImage/'

  constructor(private http: HttpClient) { }

  maquinariaImagen(file:FormData, id:string):Observable<FormData>{
    return this.http.post<FormData>(this.apiUrl +id, file);
  }
}