import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Administrador } from 'src/app/interfaces/administrador';
import { AdministradorService } from 'src/app/service/administrador.service';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/service/login.service';
import { Login } from 'src/app/interfaces/login';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-registro-admin',
  templateUrl: './registro-admin.component.html',
  styleUrls: ['./registro-admin.component.css']
})
export class RegistroAdminComponent {

  /*
  public form!: FormGroup;
  registroAdmin!: Administrador;
  */

  maxN=50;

  constructor(
    /*private fb: FormBuilder,*/
    private registroAdmin:AdministradorService, private router:Router,private loginService:LoginService) {

  }

  
  registrationForm=new FormGroup({
      nombre: new FormControl('', [Validators.required,Validators.minLength(3), Validators.maxLength(this.maxN)]),
      apellido: new FormControl('', [Validators.required,Validators.minLength(3), Validators.maxLength(this.maxN)]),
      usuario: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(this.maxN), Validators.pattern('^[A-Za-z](([0-9])|[A-Za-z])+')]),
      nacimiento: new FormControl('', [Validators.required, Validators.pattern('^\\d{4}([-])(0?[1-9]|1[0-2])\\1(3[01]|[12][0-9]|0?[1-9])')]),
      correo: new FormControl('', [Validators.required, Validators.email]),
      telefono:  new FormControl('',[Validators.required, Validators.pattern('[0-9]{8}')]),
      sexo: new FormControl('',[Validators.required]),
      clave: new FormControl('', [Validators.required,
        /*Validators.pattern(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*#?&^_-]).{8,}/)*/
      ]),
      admin: new FormControl('1')
  });
  
  get fisrtnameControl():FormControl{
    return this.registrationForm.get('nombre') as FormControl
  }
  get lastnameControl():FormControl{
    return this.registrationForm.get('apellido') as FormControl
  }
  get usernameControl():FormControl{
    return this.registrationForm.get('usuario') as FormControl
  }
  get birthdateControl():FormControl{
    return this.registrationForm.get('nacimiento') as FormControl
  }
  get emailControl():FormControl{
    return this.registrationForm.get('correo') as FormControl
  }
  get phoneControl():FormControl{
    return this.registrationForm.get('telefono') as FormControl
  }
  get genderControl():FormControl{
    return this.registrationForm.get('sexo') as FormControl
  }
  get passwordControl():FormControl{
    return this.registrationForm.get('clave') as FormControl
  }

  firstname = "";
  lastname = "";
  username = "";
  birthdate = "";
  email = "";
  phone = "";
  gender = "";
  password = "";
  admin = 1;
  

  /*
  name= new FormControl('', [Validators.required, Validators.maxLength(this.maxN)]);
  name2= new FormControl('', [Validators.required, Validators.maxLength(this.maxN)]);
  username= new FormControl('', [Validators.required, Validators.maxLength(this.maxN)]);
  birthdate= new FormControl('', [Validators.required, Validators.maxLength(this.maxN)]);
  email = new FormControl('', [Validators.required, Validators.email]);
  phone =  new FormControl('',[Validators.required, Validators.maxLength(this.maxNP)]);
  gender = new FormControl('');
  password= new FormControl('', [Validators.required, Validators.pattern(
    /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*#?&^_-]).{8,}/
  )]);
  admin= new FormControl('1');
  
  get genderControl():FormControl{
    return this.form.get('gender') as FormControl
  }
  get passwordControl():FormControl{
    return this.form.get('password') as FormControl
  }
  get adminControl():FormControl{
    return this.form.get('admin') as FormControl
  }
  
  ngOnInit(): void {
    this.form = this.fb.group({
      nombre: [''],
      apelido:[''],
      usuario:[''],
      fecha:[''],
      correo: [''],
      telefono:[0],
      sexo:[''],
      password:[''],
      admin:[1]
    })
    console.log('entrada', this.form.value)
  }

  */

  showErrors = false;
  usernameExists = false;
  emailExists = false;
  phoneExists = false;

  registro() {

    this.showErrors = true;
    this.usernameExists = false;
    this.emailExists = false;
    this.phoneExists = false;

    if (this.registrationForm.valid) {
      // handle form submission

      let newAdministrador: Administrador={
        primerNombre: "" + this.fisrtnameControl.value,
        primerApellido: "" + this.lastnameControl.value,
        nombreUsuario: "" + this.usernameControl.value,
        FechaNacimiento: "" + this.birthdateControl.value,
        correoElectronico : "" + this.emailControl.value,
        telefono:parseInt( "" + this.phoneControl.value ),
        sexo: "" + this.genderControl.value,
        password: "" + this.passwordControl.value,
        esAdmin:1,
        fotoPerfil:'',
      }

      console.log("new: ",newAdministrador)
      this.registroAdmin.newAdmin(newAdministrador).subscribe(res=>{

        let info:BookInfo = <any>res

        console.log('message:',info.message)
        console.log('status:',info.status)

        if(info.status == 200){

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

          alert("Usuario creado con exito");
          this.router.navigate(['planes']);
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
