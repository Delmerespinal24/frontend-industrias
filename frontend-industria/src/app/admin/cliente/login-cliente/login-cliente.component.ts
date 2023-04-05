import { Component } from '@angular/core';
import { LoginService } from 'src/app/service/login.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Login } from 'src/app/interfaces/login';

@Component({
  selector: 'app-login-cliente',
  templateUrl: './login-cliente.component.html',
  styleUrls: ['./login-cliente.component.css']
})
export class LoginClienteComponent {
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
      this.loginService.newLogin(loginUser).subscribe(
        res => {
          let info: BookInfo = <any>res;
          console.log('message:', info.message);
          console.log('status:', info.status);
      
          if (info.status == 200) {
            localStorage.setItem('token', info.token)
            alert("Login Correcto");
            //alert(localStorage.getItem('token'));
            console.log('info token ', info.token)
            
            this.router.navigate(['perfil-admin']);
            //this.router.navigate(['']);
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
  token: string
}