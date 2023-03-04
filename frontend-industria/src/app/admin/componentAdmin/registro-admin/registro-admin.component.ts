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



  

  constructor(private fb: FormBuilder, private registroadmin:AdministradorService) {

  }

  name= new FormControl('', [Validators.required, Validators.maxLength(this.maxN)]);
  password= new FormControl('', [Validators.required, Validators.pattern(
    /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*#?&^_-]).{8,}/
  )]);
  confirmpassword= new FormControl('', [Validators.required, Validators.pattern(
    /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*#?&^_-]).{8,}/
  )]);
  email = new FormControl('', [Validators.required, Validators.email]);
  
  ngOnInit(): void {
    this.form = this.fb.group({
      nombre: [''],
      correo: [''],
      password:[''],
      confirmpassword:[''],
    })
    console.log('entrada', this.form.value)
  }

  registro() {
    // handle form submission

    this.form = this.fb.group({
      nombre: [this.name.value],
      correo: [this.email.value],
      password:[this.password.value],
      confirmpassword:[this.confirmpassword.value],
    })
    

    this.registroAdmin=({
      name:this.name.value!,
      email:this.email.value!,
      password: this.password.value!,
      confirmpasword: this.confirmpassword.value!

    })
    console.log('form2: ', this.registroAdmin)

    // this.registroadmin.newAdmin(this.registroAdmin).subscribe(res=>{
    //   console.log('Respuesta:',res)
    // })
    console.log("new: ",this.registroAdmin)
  }
}
