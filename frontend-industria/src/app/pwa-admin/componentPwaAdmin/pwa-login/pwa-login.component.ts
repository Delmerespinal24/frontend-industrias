import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Login } from 'src/app/interfaces/login';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-pwa-login',
  templateUrl: './pwa-login.component.html',
  styleUrls: ['./pwa-login.component.css']
})
export class PwaLoginComponent {
  
  constructor(
    
    private loginService:LoginService, private router:Router) {

  }

  
  loginForm=new FormGroup({
      correo: new FormControl('', [Validators.required]),
      clave: new FormControl('', [Validators.required]),
      admin: new FormControl('1')
  });
  
  get emailControl():FormControl{
    return this.loginForm.get('correo') as FormControl
  }
  get passwordControl():FormControl{
    return this.loginForm.get('clave') as FormControl
  }

  email = "";
  password = "";

  emailExists = false;

  login() {

    this.emailExists = false;

    if (this.loginForm.valid) {
 
      
      let loginUser: Login={
        nombreUsuario : "" + this.emailControl.value,
        password: "" + this.passwordControl.value,
      }

      
      console.log("new: ",loginUser)
      this.loginService.newLoginSaas(loginUser).subscribe(
        res => {
          let info: BookInfo = <any>res;
          console.log('message:', info.message);
          console.log('status:', info.status);
      
          if (info.status == 200) {
            if(info.esAdmin){
              localStorage.setItem('token', info.token)
              alert("Login Correcto");
              //alert(localStorage.getItem('token'));
              console.log('info token ', info.token)
              
              this.router.navigate(['homePWA']);
              //this.router.navigate(['']);

            }else{
              alert("Este usuario no es un administrador");

            }
          } else if (info.status == 400) { // No existe el nombre de usuario
            alert(info.message);
          }
        },
        error => {
          if (error instanceof HttpErrorResponse) {
            alert(error.error.message);
          } else {
            alert('Ha ocurrido un error.');
          }
        }
      );
      
      

    } else {
      // display an error message to the user
      alert('Por favor llene todos los campos requeridos');
    }
   
  }

}

interface BookInfo {
  status : number,
  message: string,
  token: string,
  esAdmin: boolean
}