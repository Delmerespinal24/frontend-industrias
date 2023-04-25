import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router'; 
import { CrudMaquinaService } from 'src/app/service/crud-maquina.service';
import { url } from 'src/app/service/api-url';

@Component({
  selector: 'app-pwa-detalles',
  templateUrl: './pwa-detalles.component.html',
  styleUrls: ['./pwa-detalles.component.css']
})
export class PwaDetallesComponent {
  machine: any[] = []; // asegurandonos de que sea un arreglo
  images: string[] = ['https://nunezgil.com/img/defectoproducto.jpg', 'https://nunezgil.com/img/defectoproducto.jpg', 'https://nunezgil.com/img/defectoproducto.jpg'];
  currentImage!: string;
  detallesId!: string | null;

  constructor(private activatedRoute: ActivatedRoute, private detalleMaquina: CrudMaquinaService) {}

  ngOnInit():void{
    this.detallesId = this.activatedRoute.snapshot.paramMap.get('id')!;
    this.detalleMaquina.getMachine(this.detallesId).subscribe(
      response => {
        if(Array.isArray(response.data)){ // verificando que sea un arreglo por que si no *ngFor en el HTML no lo agarra, debe ser iterable
          this.machine = response.data;
          console.log('info maquina:',this.machine);
          this.currentImage =  url + this.machine[0].image_1
        }
      },
      error => {
        console.error(error);
      }
    );
    console.log('id: ', this.detallesId)
    
  }

  changeImage(index: number) {
    if(index == 0){
      if(this.machine[0].image_1 != "" && this.machine[0].image_1 != undefined){
      
        this.currentImage = url + this.machine[0].image_1
  
      }else{
        
        this.currentImage = this.images[index];
      }
    }else if (index == 1){
      if(this.machine[0].image_2 != "" && this.machine[0].image_2 != undefined){
      
        this.currentImage = url + this.machine[0].image_2
  
      }else{
        
        this.currentImage = this.images[index];
      }

      
    }else if (index == 2){
      if(this.machine[0].image_3 != "" && this.machine[0].image_3 != undefined){
      
        this.currentImage = url + this.machine[0].image_3
  
      }else{
        
        this.currentImage = this.images[index];
      }

    }
    
  }

}
