import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { InfoMaquina } from 'src/app/interfaces/info-maquina';
import { CrudMaquinaService } from 'src/app/service/crud-maquina.service';

@Component({
  selector: 'app-pwa-home',
  templateUrl: './pwa-home.component.html',
  styleUrls: ['./pwa-home.component.css']
})
export class PwaHomeComponent {
  openTab = 1;
  seleccion=0;
  sidebarOpen = true;
  
  constructor(

    private nuevaMaquina:CrudMaquinaService, private router:Router,) {

  }

  openSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }

  toggleTabs($tabNumber: number){
    this.openTab = $tabNumber;
  }

  
  plan(numero:number){
    this.seleccion = numero;

    if (this.seleccion==1) {

    }if (this.seleccion==2) {

    }if(this.seleccion==3) {

    }else{
      
    }
  }

  agregarMaquinariaForm=new FormGroup({
    nombreMaquina: new FormControl('', [Validators.required]),
    descripcionMaquina: new FormControl('', [Validators.required]),
    tipoMaquina: new FormControl('', [Validators.required]),
    precioMaquina: new FormControl('', [Validators.required]),
    existenciaMaquina: new FormControl('', [Validators.required]),
    paisMaquina: new FormControl('', [Validators.required]),
    marcaMaquina: new FormControl('', [Validators.required]),
    imagen1Maquina: new FormControl('', [Validators.required]),
    imagen2Maquina: new FormControl('1'),
    imagen3Maquina: new FormControl('2'),
});

get nombreMaquina():FormControl{
  return this.agregarMaquinariaForm.get('nombreMaquina') as FormControl
}
get descripcionMaquina():FormControl{
  return this.agregarMaquinariaForm.get('descripcionMaquina') as FormControl
}

get tipoMaquina():FormControl{
  return this.agregarMaquinariaForm.get('tipoMaquina') as FormControl
}

get precioMaquina():FormControl{
  return this.agregarMaquinariaForm.get('precioMaquina') as FormControl
}

get existenciaMaquina():FormControl{
  return this.agregarMaquinariaForm.get('existenciaMaquina') as FormControl
}

get paisMaquina():FormControl{
  return this.agregarMaquinariaForm.get('paisMaquina') as FormControl
}

get marcaMaquina():FormControl{
  return this.agregarMaquinariaForm.get('marcaMaquina') as FormControl
}

get imagen1Maquina():FormControl{
  return this.agregarMaquinariaForm.get('imagen1Maquina') as FormControl
}


agregarMaquinaria(){
  console.log('info: ',this.agregarMaquinariaForm)

  let newAgregarMaquinaria: InfoMaquina={
    nombreMaquina: ''+this.nombreMaquina.value,
    descripcionMaquina: ''+this.descripcionMaquina.value,
    tipoMaquina: ''+this.tipoMaquina.value,
    precioMaquina:parseInt( "" + this.precioMaquina.value ),
    existenciaMaquina:parseInt( "" + this.existenciaMaquina.value ),
    paisMaquina: ''+this.paisMaquina.value,
    marcaMaquina: ''+this.marcaMaquina.value,
    imagen1Maquina: ''+this.imagen1Maquina.value,
    imagen2Maquina: '2',
    imagen3Maquina: '3',
  }

  console.log("new: ",newAgregarMaquinaria)

  this.nuevaMaquina.newMachine(newAgregarMaquinaria).subscribe(
    res=>{
      let info:BookInfo = <any>res

        console.log('message:',info.message)
        console.log('status:',info.status)

        if(info.status == 200){
          alert("Maquinaria agregada");
        }else if(info.status == 400){ 
          alert("error");
         
        }else if(info.status == 401){ 
          alert("error");

        }else if(info.status == 402){ 
          alert("error");

        }else{
          alert("Ha ocurrido un problema.");
        }

    }
  )
}

}

interface BookInfo {
  status : number,
  message: string,
}
