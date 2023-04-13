import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { InfoMaquina, InfoMaquina2, MachinesResponse } from 'src/app/interfaces/info-maquina';
import { CrudMaquinaService } from 'src/app/service/crud-maquina.service';
import { TokenService } from 'src/app/service/token.service';

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
  maquina:any;

  constructor(
    private nuevaMaquina: CrudMaquinaService,
    private router: Router,
    private tokenService: TokenService
  ) {}

  ngOnInit(): void {}
  cargarMaquinas() {
    this.nuevaMaquina.getMachinery().subscribe((response) => {
      this.machinesResponse = response;
      console.log(this.machinesResponse); // log the machinery data to the console
    });
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
    imagen2Maquina: new FormControl('1'),
    imagen3Maquina: new FormControl('2'),
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

  agregarMaquinaria() {
    console.log('info: ', this.agregarMaquinariaForm);

    let newAgregarMaquinaria: InfoMaquina = {
      nombre: '' + this.nombreMaquina.value,
      descripcion: '' + this.descripcionMaquina.value,
      TipoMaquina: '' + this.tipoMaquina.value,
      precio: parseInt('' + this.precioMaquina.value),
      existencia: parseInt('' + this.existenciaMaquina.value),
      pais: '' + this.paisMaquina.value,
      marca: '' + this.marcaMaquina.value,
      image_1: '' + this.imagen1Maquina.value,
      image_2: '2',
      image_3: '3',
    };

    console.log('new: ', newAgregarMaquinaria);

    this.nuevaMaquina.newMachine(newAgregarMaquinaria).subscribe((res) => {
      let info: BookInfo = <any>res;

      console.log('message:', info.message);
      console.log('status:', info.status);

      if (info.status == 200) {
        alert('Maquinaria agregada');
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
  }

  logout(){
    this.tokenService.RemoveToken();
    this.router.navigate(['loginPWA']);
  }
}

interface BookInfo {
  status: number;
  message: string;
  data: InfoMaquina[];
}
