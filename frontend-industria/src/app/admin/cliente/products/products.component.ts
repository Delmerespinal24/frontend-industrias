import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { InfoMaquina, InfoMaquina2, MachinesResponse } from 'src/app/interfaces/info-maquina';
import { CrudMaquinaService } from 'src/app/service/crud-maquina.service';
import { Token } from 'src/app/interfaces/token';
import { TokenClientService } from 'src/app/service/tokenClient.service';
import { Filtro } from 'src/app/interfaces/filtro';
import { FiltroService } from 'src/app/service/filtro.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {

  
    openTab = 1;
    seleccion = 0;
    sidebarOpen = true;
  
    machines!: InfoMaquina2[];
    machinesResponse!: MachinesResponse;
    maquina:any;
    listaMaquinas!:any[];

    token!:Token;
    infoToken:any;
    dropdownVisible = false;
    isLoggedIn = false;
  
    constructor(
      private nuevaMaquina: CrudMaquinaService,
      private router: Router,
      private TokenClientService: TokenClientService,
      private filtroService: FiltroService
    ) {
      this.token = { token: this.TokenClientService.getToken() };

      if (this.token.token) {
        this.isLoggedIn = true;

        this.TokenClientService.decodedToken(this.token).subscribe({
          next: res => {
            this.infoToken = res.data;
        
          },
          error: error => {
            console.log(error);
          }
        });
      }
    }
  
    ngOnInit(): void {
      this.cargarMaquinas();
    }

    toggleDropdown() {
      this.dropdownVisible = !this.dropdownVisible;
    }
  
    logout(){
      this.TokenClientService.RemoveToken();
      this.router.navigate(['login-festival'])
    }

    cargarMaquinas() {
      this.nuevaMaquina.getMachinery().subscribe((response) => {
        this.machinesResponse = response;
        this.listaMaquinas = this.machinesResponse.data
        console.log(this.machinesResponse); // log the machinery data to the console
      });
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
  

    filtrar(marca="", nombre="",TipoMaquina="",pais="",precioMinimo="",precioMaximo=""){
      let newFiltro: Filtro = {
        nombre: nombre,
        TipoMaquina: TipoMaquina,
        marca: marca,
        pais: pais,
        precioMinimo: precioMinimo,
        precioMaximo: precioMaximo

      }

      if(nombre=="" && TipoMaquina=="" && marca=="" && pais=="" && precioMinimo=="" && precioMaximo==""){
        alert('No se han encontrado resultados');

      }else{
        this.filtroService.filtrar(newFiltro).subscribe((res) => {
          let info: BookInfo = <any>res;
          this.listaMaquinas = info.resultado;
        })
      }

    }
  
}

interface BookInfo {
  status: number;
  message: string;
  data: InfoMaquina[];
  resultado: any[];
}


