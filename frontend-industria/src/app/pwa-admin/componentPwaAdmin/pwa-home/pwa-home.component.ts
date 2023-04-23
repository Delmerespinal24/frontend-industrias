import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { InfoMaquina, InfoMaquina2, MachinesResponse } from 'src/app/interfaces/info-maquina';
import { CrudMaquinaService } from 'src/app/service/crud-maquina.service';
import { TokenService } from 'src/app/service/token.service';
import { ImagenService } from 'src/app/service/imagen.service';
import { url } from 'src/app/service/api-url';

@Component({
  selector: 'app-pwa-home',
  templateUrl: './pwa-home.component.html',
  styleUrls: ['./pwa-home.component.css'],
})
export class PwaHomeComponent {
  openTab = 1;
  seleccion = 0;
  sidebarOpen = true;

  machines!: InfoMaquina2[];
  machinesResponse!: MachinesResponse;
  maquina: any;

  archivosNew: any = []; //Sera de tipo array
  srcArrayNew: any = [];

  constructor(
    private nuevaMaquina: CrudMaquinaService,
    private router: Router,
    private tokenService: TokenService,
    private imagenService: ImagenService
  ) { }

  ngOnInit(): void { }
  cargarMaquinas() {
    this.nuevaMaquina.getMachinery().subscribe((response) => {
      this.machinesResponse = response;
      console.log(this.machinesResponse); // log the machinery data to the console
    });

    this.srcArrayNew.length = 0;
    this.archivosNew.length = 0;
    this.agregarMaquinariaForm.reset();
  }

  deleteMachine(idMaquina: number) {
    console.log('id: ', idMaquina)
    this.nuevaMaquina.deleteMachine(idMaquina).subscribe(
      response => {
        console.log(response);
        alert('Maquina eliminada');
        this.cargarMaquinas();
        // handle success
      },
      error => {
        console.error(error);
        // handle error
      }
    );
  }


  openSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }

  toggleTabs($tabNumber: number) {
    this.openTab = $tabNumber;
  }

  plan(numero: number) {
    this.seleccion = numero;

    if (this.seleccion == 1) {
    }
    if (this.seleccion == 2) {
    }
    if (this.seleccion == 3) {
    } else {
    }
  }

  agregarMaquinariaForm = new FormGroup({
    nombreMaquina: new FormControl('', [Validators.required]),
    descripcionMaquina: new FormControl('', [Validators.required]),
    tipoMaquina: new FormControl('', [Validators.required]),
    precioMaquina: new FormControl('', [Validators.required]),
    existenciaMaquina: new FormControl('', [Validators.required]),
    paisMaquina: new FormControl('', [Validators.required]),
    marcaMaquina: new FormControl('', [Validators.required]),
    imagen1Maquina: new FormControl('', [Validators.required]),
    imagen2Maquina: new FormControl(''),
    imagen3Maquina: new FormControl(''),
  });

  get nombreMaquina(): FormControl {
    return this.agregarMaquinariaForm.get('nombreMaquina') as FormControl;
  }
  get descripcionMaquina(): FormControl {
    return this.agregarMaquinariaForm.get('descripcionMaquina') as FormControl;
  }

  get tipoMaquina(): FormControl {
    return this.agregarMaquinariaForm.get('tipoMaquina') as FormControl;
  }

  get precioMaquina(): FormControl {
    return this.agregarMaquinariaForm.get('precioMaquina') as FormControl;
  }

  get existenciaMaquina(): FormControl {
    return this.agregarMaquinariaForm.get('existenciaMaquina') as FormControl;
  }

  get paisMaquina(): FormControl {
    return this.agregarMaquinariaForm.get('paisMaquina') as FormControl;
  }

  get marcaMaquina(): FormControl {
    return this.agregarMaquinariaForm.get('marcaMaquina') as FormControl;
  }

  get imagen1Maquina(): FormControl {
    return this.agregarMaquinariaForm.get('imagen1Maquina') as FormControl;
  }

  capturarFileNew(event: any) {
    console.log('este corresponde a nuevo');

    if (event.target.files.length > 0) {
      if (event.target.files.length <= 10) {
        let files = event.target.files;

        let file;
        for (let i = 0; i < files.length; i++) {
          if (this.archivosNew.length < 10) {
            file = files[i];
            this.archivosNew.push(file);
            const reader = new FileReader();
            reader.onload = (file) => {
              this.srcArrayNew.push({
                img: reader.result,
                id: this.srcArrayNew.length == 0 ? 0 : this.srcArrayNew.length,
              });
            };
            reader.readAsDataURL(file);
          } else {
            window.alert('No mas de 3 imagenes');
          }
        }
      } else {
        window.alert('No mas de 3 imagenes');
      }
    }
  }
  deleteFileNew(id: number) {
    this.srcArrayNew.splice(id, 1);
    this.archivosNew.splice(id, 1);

    for (let i = 0; i < this.srcArrayNew.length; i++) {
      this.srcArrayNew[i].id = i;
    }
  }

  agregarMaquinaria() {

    if (this.srcArrayNew.length >= 1) {

      console.log('info: ', this.agregarMaquinariaForm);

      let newAgregarMaquinaria: InfoMaquina = {
        nombre: '' + this.nombreMaquina.value,
        descripcion: '' + this.descripcionMaquina.value,
        TipoMaquina: '' + this.tipoMaquina.value,
        precio: parseInt('' + this.precioMaquina.value),
        existencia: parseInt('' + this.existenciaMaquina.value),
        pais: '' + this.paisMaquina.value,
        marca: '' + this.marcaMaquina.value,
        image_1: '',
        image_2: '',
        image_3: '',
      };
      console.log('new: ', newAgregarMaquinaria);


      this.nuevaMaquina.newMachine(newAgregarMaquinaria).subscribe((res) => {
        let info: BookInfo = <any>res;

        console.log('message:', info.message);
        console.log('status:', info.status);

        if (info.status == 200) {
          alert('Maquinaria agregada');

          //Recorre el arreglo de archivos
          this.archivosNew.forEach((archivo: any, index:number) => {
            const formularioDeDatos = new FormData();
            formularioDeDatos.append('image', archivo);

            //Sube archivo uno por uno
            this.imagenService.maquinariaImagen(formularioDeDatos, info.idMaquina + "-image_" + (index+1) )
              .subscribe((res) => {
                console.log('Respuesta ', res);
              })
          });

          this.archivosNew.length = 0;
          this.srcArrayNew.length = 0;
          alert('Producto cargado exitosamente')

          this.agregarMaquinariaForm.reset();
        } else if (info.status == 400) {
          alert('error');
        } else if (info.status == 401) {
          alert('error');
        } else if (info.status == 402) {
          alert('error');
        } else {
          alert('Ha ocurrido un problema.');
        }
      });

      //* Dentro de agregar maquina recibe id de la maquina

    } else {
      alert('Debes cargar al menos una imagen');
    }

  }

  logout() {
    this.tokenService.RemoveToken();
    this.router.navigate(['loginPWA']);
  }

  cargarImagen(maquina:any){
    let ruta:string;
    console.log(maquina)
    
    if(maquina.image_1 != "" && maquina.image_1 != undefined){
      
      ruta = url + maquina.image_1
  
    }else{
      
      ruta = "https://cdn.tailgrids.com/2.0/image/application/images/cards/card-01/image-01.jpg"
    }
  
    return ruta
  }
  
}


interface BookInfo {
  status: number;
  message: string;
  idMaquina: number;
}
