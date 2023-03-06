import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Administrador } from 'src/app/interfaces/administrador';
import { AdministradorService } from 'src/app/service/administrador.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-registro-admin',
  templateUrl: './registro-admin.component.html',
  styleUrls: ['./registro-admin.component.css']
})
export class RegistroAdminComponent {

 public form!: FormGroup;
  registroAdmin!: Administrador;

  maxN=20;
  maxNP=10;

  

  constructor(private fb: FormBuilder, private registroadmin:AdministradorService,private router:Router,) {

  }
  

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

 

  registro() {
    if (this.form.valid) {
      // handle form submission
      let phone1:number = parseInt(this.phone.value as string);
      let admin1: number = parseInt(this.admin.value as string)

      this.registroAdmin=({
        primerNombre:this.name.value!,
        primerApellido:this.name2.value!,
        nombreUsuario:this.username.value!,
        FechaNacimiento: this.birthdate.value!,
        correoElectronico :this.email.value!,
        telefono:phone1,
        sexo:this.gender.value!,
        password: this.password.value!,
        esAdmin:admin1,
      })
  
      console.log("new: ",this.registroAdmin)
      this.registroadmin.newAdmin(this.registroAdmin).subscribe(res=>{
        console.log('Respuesta:',res)
      })

      alert("Usuario creado con exito");
      this.router.navigate(['']);
      
    } else {
      // display an error message to the user
      alert('Please fill all required fields');
    }
  }
  
}
