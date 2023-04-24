import { Injectable } from '@angular/core';
import { url } from './api-url';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiRestServiceService {

  public urlPush = 'http://localhost:4000/save'
  public urlPushNot = 'http://localhost:4000/send'

  constructor(private http: HttpClient) { }

  saveToken=(token: any)=>{
    console.log('tipo:  ', typeof token, 'token: ', token)
    return this.http.post(this.urlPush,{token});
  };

  sendPushNot=(dias: any)=>{
    const payload = { dias: dias };
    return this.http.post(this.urlPushNot, payload);
}

}
