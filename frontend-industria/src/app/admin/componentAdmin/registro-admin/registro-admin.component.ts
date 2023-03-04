import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Administrador } from 'src/app/interfaces/administrador';
import { AdministradorService } from 'src/app/service/administrador.service';


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


  

  constructor(private fb: FormBuilder, private registroadmin:AdministradorService) {

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
    })
    console.log('entrada', this.form.value)
  }

  registro() {
    // handle form submission
    
    let phone1:number = parseInt(this.phone.value as string);

    this.form = this.fb.group({
      nombre: [this.name.value],
      apelido:[this.name2.value],
      usuario:[this.username.value],
      birthdate:[this.birthdate],
      correo: [this.email.value],
      telefono:[this.phone.value],
      sexo:[this.gender.value],
      password:[this.password.value],
    })
    

    this.registroAdmin=({
      name:this.name.value!,
      name2:this.name2.value!,
      username:this.username.value!,
      birthdate: this.birthdate.value!,
      email:this.email.value!,
      phone:phone1,
      gender:this.gender.value!,
      password: this.password.value!,

    })
    console.log('form2: ', this.registroAdmin)

    // this.registroadmin.newAdmin(this.registroAdmin).subscribe(res=>{
    //   console.log('Respuesta:',res)
    // })
    console.log("new: ",this.registroAdmin)
  }
}
