import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router'; 
import { CrudMaquinaService } from 'src/app/service/crud-maquina.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { url } from 'src/app/service/api-url';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent {

  machine: any[] = []; // asegurandonos de que sea un arreglo
  images: string[] = ['https://img.interempresas.net/fotos/1238989.jpeg', 'https://www.maquinariacolas.com/wp-content/uploads/2019/07/Centro-Mazak-VTC-usado.jpg?v=1591031640', 'https://www.dupuis-mecanique.com/photos/vtc200b.jpg'];
  currentImage: string = this.images[0];
  detallesId!: string | null;
  public modal: boolean=false;

  constructor(private activatedRoute: ActivatedRoute, private detalleMaquina: CrudMaquinaService) {}

  ngOnInit():void{
    this.detallesId = this.activatedRoute.snapshot.paramMap.get('id')!;
    this.detalleMaquina.getMachine(this.detallesId).subscribe(
      response => {
        if(Array.isArray(response.data)){ // verificando que sea un arreglo por que si no *ngFor en el HTML no lo agarra, debe ser iterable
          this.machine = response.data;
          console.log('info maquina:',this.machine);
        }
      },
      error => {
        console.error(error);
      }
    );
    console.log('id: ', this.detallesId)
  }

  get numeroTarjetaControl():FormControl{
    return this.pagoForm.get('numeroTarjeta') as FormControl;
  }

  get fechaVencimientoControl():FormControl{
    return this.pagoForm.get('fechaVencimiento')as FormControl;
  }

  get codigoCVVControl():FormControl{
    return this.pagoForm.get('codigoCVV') as FormControl;
  }

  changeImage(index: number) {
    if(index == 0){
      if(this.machine[0].image_1 != "" && this.machine[0].image_1 != undefined){
      
        this.currentImage = url + this.machine[0].image_1
  
      }else{
        
        this.currentImage = this.images[index];
      }
    }else if (index == 1){
      if(this.machine[0].image_1 != "" && this.machine[0].image_1 != undefined){
      
        this.currentImage = url + this.machine[0].image_2
  
      }else{
        
        this.currentImage = this.images[index];
      }

      
    }else if (index == 2){
      if(this.machine[0].image_1 != "" && this.machine[0].image_1 != undefined){
      
        this.currentImage = url + this.machine[0].image_3
  
      }else{
        
        this.currentImage = this.images[index];
      }

    }
    
  }

  pagoForm=new FormGroup({
    numeroTarjeta: new FormControl('', [Validators.required]),
    fechaVencimiento: new FormControl('', [Validators.required]),
    codigoCVV: new FormControl('',[Validators.required])
  });
    

}