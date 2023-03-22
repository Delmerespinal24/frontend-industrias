import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Administrador } from 'src/app/interfaces/administrador';
import { AdministradorService } from 'src/app/service/administrador.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-perfil-admin',
  templateUrl: './perfil-admin.component.html',
  styleUrls: ['./perfil-admin.component.css']
})
export class PerfilAdminComponent {

  maxN=50;

  constructor(
    /*private fb: FormBuilder,*/
    private registroAdmin:AdministradorService, private router:Router) {

  }

  
  loginForm=new FormGroup({
      correo: new FormControl('', [Validators.required, Validators.email]),
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

  showErrors = false;
  emailExists = false;

  login() {

    this.showErrors = true;
    this.emailExists = false;

    if (this.loginForm.valid) {
      // handle form submission
 
      /*
      let newAdministrador: Administrador={
        correoElectronico : "" + this.emailControl.value,
        password: "" + this.passwordControl.value,
      }

      console.log("new: ",newAdministrador)
      this.registroAdmin.newAdmin(newAdministrador).subscribe(res=>{

        let info:BookInfo = <any>res

        console.log('message:',info.message)
        console.log('status:',info.status)

        if(info.status == 200){

          alert("Usuario creado con exito");
          this.router.navigate(['']);
        }else if(info.status == 400){ // Ya existe el nombre de usuario
          this.usernameExists = true;
         
        }else if(info.status == 401){ // El correo electronico ya está en uso
          this.emailExists = true;

        }else if(info.status == 402){ // El número de teléfono ya está en uso
          this.phoneExists = true;

        }else{
          alert("Ha ocurrido un problema.");
        }

      })
      */

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
