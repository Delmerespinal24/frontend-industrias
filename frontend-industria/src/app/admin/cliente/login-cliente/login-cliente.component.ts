import { Component } from '@angular/core';
import { LoginService } from 'src/app/service/login.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Login } from 'src/app/interfaces/login';
import { TokenClientService } from 'src/app/service/tokenClient.service';

@Component({
  selector: 'app-login-cliente',
  templateUrl: './login-cliente.component.html',
  styleUrls: ['./login-cliente.component.css']
})
export class LoginClienteComponent {
  constructor(
    private loginService:LoginService, private router:Router, private TokenClientService: TokenClientService,) {

      let token = { token: this.TokenClientService.getToken() };

      if (token.token) {
        this.router.navigate(['machinery']);
      }


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

      this.loginService.newLogin(loginUser).subscribe(
        res => {
          let info: BookInfo = <any>res;

          if (info.status == 200) {
            console.log(info)
            if(info.esAdmin){
              alert("No puede iniciar sesión con este usuario ");
            }else{
              localStorage.setItem('token-festival', info.token)
              console.log(info.token)
              alert("Login Correcto");
              //alert(localStorage.getItem('token-festival'));
              
              this.router.navigate(['machinery']);
              //this.router.navigate(['']);

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