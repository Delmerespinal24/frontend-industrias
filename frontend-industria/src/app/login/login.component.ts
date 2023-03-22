import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Login } from 'src/app/interfaces/login';
import { LoginService } from 'src/app/service/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {


  maxN=50;

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
        correoElectronico : "" + this.emailControl.value,
        password: "" + this.passwordControl.value,
      }

      
      console.log("new: ",loginUser)
      this.loginService.newLogin(loginUser).subscribe(res=>{

        let info:BookInfo = <any>res

        console.log('message:',info.message)
        console.log('status:',info.status)

        if(info.status == 200){

          alert("Login Correcto");
          //this.router.navigate(['']);
        }
        /*
        else if(info.status == 400){ // Ya existe el nombre de usuario
          this.usernameExists = true;
         
        }else if(info.status == 401){ // El correo electronico ya está en uso
          this.emailExists = true;

        }else if(info.status == 402){ // El número de teléfono ya está en uso
          this.phoneExists = true;

        }else{
          alert("Ha ocurrido un problema.");
        }*/

      })
      
      

    } else {
      // display an error message to the user
      alert('Por favor llene todos los campos requeridos');
    }
   
  }
  
}

interface BookInfo {
  status : number;
  message: string
}
