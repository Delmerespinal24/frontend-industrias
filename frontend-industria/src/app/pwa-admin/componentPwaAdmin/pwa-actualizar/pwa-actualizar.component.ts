import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { InfoMaquina } from 'src/app/interfaces/info-maquina';
import { CrudMaquinaService } from 'src/app/service/crud-maquina.service';

@Component({
  selector: 'app-pwa-actualizar',
  templateUrl: './pwa-actualizar.component.html',
  styleUrls: ['./pwa-actualizar.component.css']
})
export class PwaActualizarComponent {

  machine: any[] = []; // asegurandonos de que sea un arreglo
  detallesId!: string | null;


  ngOnInit():void{
    this.detallesId = this.activatedRoute.snapshot.paramMap.get('id')!;
    console.log('id: ', this.detallesId)

    this.detalleMaquina.getMachine(this.detallesId).subscribe(
      response => {
        if(Array.isArray(response.data)){ // verificando que sea un arreglo por que si no *ngFor en el HTML no lo agarra, debe ser iterable
          this.machine = response.data;
          this.actualizarMaquinariaForm = new FormGroup({
            nombreMaquina: new FormControl(this.machine[0].nombre, [Validators.required]),
            descripcionMaquina: new FormControl(this.machine[0].descripcion, [Validators.required]),
            tipoMaquina: new FormControl(this.machine[0].TipoMaquina, [Validators.required]),
            precioMaquina: new FormControl(this.machine[0].precio, [Validators.required]),
            existenciaMaquina: new FormControl(this.machine[0].existencia, [Validators.required]),
            paisMaquina: new FormControl(this.machine[0].pais, [Validators.required]),
            marcaMaquina: new FormControl(this.machine[0].marca, [Validators.required]),
            imagen1Maquina: new FormControl(this.machine[0].image_1, [Validators.required]),
            imagen2Maquina: new FormControl(this.machine[0].image_2),
            imagen3Maquina: new FormControl(this.machine[0].image_3),
          });
          console.log('info maquina:',this.machine);
        }
      },
      error => {
        console.error(error);
      }
    );

    console.log('id: ', this.detallesId)
  }

  constructor(
    private nuevaMaquina: CrudMaquinaService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private detalleMaquina: CrudMaquinaService
  ) {}

  actualizarMaquinariaForm = new FormGroup({
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
    return this.actualizarMaquinariaForm.get('nombreMaquina') as FormControl;
  }
  get descripcionMaquina(): FormControl {
    return this.actualizarMaquinariaForm.get('descripcionMaquina') as FormControl;
  }

  get tipoMaquina(): FormControl {
    return this.actualizarMaquinariaForm.get('tipoMaquina') as FormControl;
  }

  get precioMaquina(): FormControl {
    return this.actualizarMaquinariaForm.get('precioMaquina') as FormControl;
  }

  get existenciaMaquina(): FormControl {
    return this.actualizarMaquinariaForm.get('existenciaMaquina') as FormControl;
  }

  get paisMaquina(): FormControl {
    return this.actualizarMaquinariaForm.get('paisMaquina') as FormControl;
  }

  get marcaMaquina(): FormControl {
    return this.actualizarMaquinariaForm.get('marcaMaquina') as FormControl;
  }

  get imagen1Maquina(): FormControl {
    return this.actualizarMaquinariaForm.get('imagen1Maquina') as FormControl;
  }

  actualizarMaquinaria() {
    console.log('info: ', this.actualizarMaquinariaForm);

    let newActualizarMaquinaria: InfoMaquina = {
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

    console.log('new: ', newActualizarMaquinaria);

    this.nuevaMaquina.updateMachine(this.detallesId!,newActualizarMaquinaria).subscribe((res) => {
      let info: BookInfo = <any>res;

      console.log('message:', info.message);
      console.log('status:', info.status);

      if (info.status == 200) {
        alert('Maquina actualizada con éxito');
        this.router.navigate(['homePWA']);
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

}

interface BookInfo {
  status: number;
  message: string;
  data: InfoMaquina[];
}



