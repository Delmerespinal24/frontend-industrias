import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CrudMaquinaService } from 'src/app/service/crud-maquina.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Compra } from 'src/app/interfaces/compra';
import { CompraService } from 'src/app/service/compra.service';
import { TokenClientService } from 'src/app/service/tokenClient.service';
import { Router } from '@angular/router';
import { Factura } from 'src/app/interfaces/factura';
import { FacturaService } from 'src/app/service/factura.service';

@Component({
  selector: 'app-payment-confirmation',
  templateUrl: './payment-confirmation.component.html',
  styleUrls: ['./payment-confirmation.component.css']
})
export class PaymentConfirmationComponent {

  machine: any[] = []; // asegurandonos de que sea un arreglo
  images: string[] = ['https://img.interempresas.net/fotos/1238989.jpeg', 'https://www.maquinariacolas.com/wp-content/uploads/2019/07/Centro-Mazak-VTC-usado.jpg?v=1591031640', 'https://www.dupuis-mecanique.com/photos/vtc200b.jpg'];
  currentImage: string = this.images[0];
  detallesId!: string | null;
  public modal: boolean = false;
  tarjetaCompra!: Compra;
  factura!: Factura;
  precios!: any;

  constructor(private activatedRoute: ActivatedRoute, private detalleMaquina: CrudMaquinaService, private router: Router,
    private compraService: CompraService, private facturaSevice: FacturaService) { }

  ngOnInit(): void {
    this.detallesId = this.activatedRoute.snapshot.paramMap.get('id')!;
    this.detalleMaquina.getMachine(this.detallesId).subscribe(
      response => {
        if (Array.isArray(response.data)) { // verificando que sea un arreglo por que si no *ngFor en el HTML no lo agarra, debe ser iterable
          this.machine = response.data;
          
          const tarjeta = localStorage.getItem("tarjeta");
          let datos = ("" + tarjeta).split(",")
  
          this.tarjetaCompra = {
            idUsuario: datos[0],
            idMaquina: this.machine[0].idMaquina,
            cantidadProducto: parseInt(datos[1]),
            noTarjeta: parseInt(datos[2]),
            fechaVencimientoT: datos[3],
            codigoCVV: parseInt(datos[4])
          };

          this.factura = {
            idUsuario: this.tarjetaCompra.idUsuario,
            idMaquina: this.tarjetaCompra.idMaquina,
            cantidadProducto: this.tarjetaCompra.cantidadProducto
          };


          this.facturaSevice.obtenerFactura(this.factura).subscribe(
            (response) => {
              let info:BookInfo = <any>response;
  
              if(info.status==200){
                console.log(info.message)
                this.precios = info.compra;
                console.log(this.precios)

              }else{
                alert("Estado: "+info.status+"mensaje: "+info.message)
              }

          })
          
        }

      },
      error => {
        console.error(error);
      }
    );

  }

  compra() {

    this.compraService.pagoTarjeta(this.tarjetaCompra).subscribe((res) => {
      let info: BookInfo = <any>res;

      if (info.status == 200) {
        alert("¡Compra exitosa!")
        this.router.navigate(['login-festival'])
        localStorage.removeItem("tarjeta");

      } else {
        alert(info.message)

      }
    })


  }

}

interface BookInfo {
  status: number;
  message: string;
  compra: any;
}
