import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CrudMaquinaService } from 'src/app/service/crud-maquina.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Compra } from 'src/app/interfaces/compra';
import { CompraService } from 'src/app/service/compra.service';
import { TokenClientService } from 'src/app/service/tokenClient.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer-payment',
  templateUrl: './customer-payment.component.html',
  styleUrls: ['./customer-payment.component.css']
})
export class CustomerPaymentComponent {

  machine: any[] = []; // asegurandonos de que sea un arreglo
  images: string[] = ['https://img.interempresas.net/fotos/1238989.jpeg', 'https://www.maquinariacolas.com/wp-content/uploads/2019/07/Centro-Mazak-VTC-usado.jpg?v=1591031640', 'https://www.dupuis-mecanique.com/photos/vtc200b.jpg'];
  currentImage: string = this.images[0];
  detallesId!: string | null;
  public modal: boolean = false;

  constructor(private activatedRoute: ActivatedRoute, private detalleMaquina: CrudMaquinaService, private router: Router,
    private TokenClientService: TokenClientService, private compraService: CompraService) { }

  ngOnInit(): void {
    this.detallesId = this.activatedRoute.snapshot.paramMap.get('id')!;
    this.detalleMaquina.getMachine(this.detallesId).subscribe(
      response => {
        if (Array.isArray(response.data)) { // verificando que sea un arreglo por que si no *ngFor en el HTML no lo agarra, debe ser iterable
          this.machine = response.data;
          console.log('info maquina:', this.machine);
        }
      },
      error => {
        console.error(error);
      }
    );
    console.log('id: ', this.detallesId)
  }

  get cantidadUnidadesControl(): FormControl {
    return this.compraForm.get('cantidadUnidades') as FormControl;
  }

  get numeroTarjetaControl(): FormControl {
    return this.compraForm.get('numeroTarjeta') as FormControl;
  }

  get fechaVencimientoControl(): FormControl {
    return this.compraForm.get('fechaVencimiento') as FormControl;
  }

  get codigoCVVControl(): FormControl {
    return this.compraForm.get('codigoCVV') as FormControl;
  }

  changeImage(index: number) {
    this.currentImage = this.images[index];
  }

  compraForm = new FormGroup({
    cantidadUnidades: new FormControl('', [Validators.required]),
    numeroTarjeta: new FormControl('', [Validators.required]),
    fechaVencimiento: new FormControl('', [Validators.required]),
    codigoCVV: new FormControl('', [Validators.required])
  });



  compra() {
    let token = { token: this.TokenClientService.getToken() };


    let infoToken: any;
    this.TokenClientService.decodedToken(token).subscribe({
      next: res => {
        infoToken = res.data;

        let tarjetaCompra: Compra = {
          idUsuario: infoToken.user.idUsuario,
          idMaquina: this.machine[0].idMaquina,
          cantidadProducto: parseInt('' + this.compraForm.get('cantidadUnidades')?.value),
          noTarjeta: parseInt('' + this.compraForm.get('numeroTarjeta')?.value),
          fechaVencimientoT: '' + this.compraForm.get('fechaVencimiento')?.value,
          codigoCVV: parseInt('' + this.compraForm.get('codigoCVV')?.value),
        };

        if (tarjetaCompra.cantidadProducto < 1 || tarjetaCompra.cantidadProducto > this.machine[0].existencia) {
          alert("Cantidad no valida")
        } else {
          if (this.validateCreditCard("" + tarjetaCompra.noTarjeta, tarjetaCompra.fechaVencimientoT, "" + tarjetaCompra.codigoCVV)) {

            this.compraService.pagoTarjeta(tarjetaCompra).subscribe((res) => {
              let info: BookInfo = <any>res;

              if (info.status == 200) {
                alert("¡Compra exitosa!")
                this.router.navigate(['login-festival'])

              } else {
                alert(info.message)

              }
            })

          }
        }

      },
      error: error => {
        console.log(error);
      }
    });

  }

  validateCreditCard(cardNumber: string, expiry: string, cvv: string): boolean {
    // Validar número de tarjeta
    const cardNumberRegex = /^[0-9]{16}$/;
    if (!cardNumberRegex.test(cardNumber)) {
      alert("Número de tarjeta no valido")
      return false;
    }

    // Validar fecha de expiración
    const expiryRegex = /^(0[1-9]|1[0-2])\/([0-9]{2})$/;
    if (!expiryRegex.test(expiry)) {
      alert("Fecha de vencimiento no valida")
      return false;
    }

    let exp = expiry.split("/")

    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const lastTwoDigitsOfYear = currentYear.toString().slice(-2)
    if (parseInt(exp[1]) < parseInt(lastTwoDigitsOfYear)) {
      alert("La tarjeta ya expiro")
      return false;
    } else if (parseInt(exp[1]) == parseInt(lastTwoDigitsOfYear)) {
      const currentMonth = currentDate.getMonth() + 1;
      if (parseInt(exp[0]) <= currentMonth) {
        alert("La tarjeta ya expiro")
        return false;
      }
    }

    // Validar CVV
    const cvvRegex = /^[0-9]{3}$/;
    if (!cvvRegex.test(cvv)) {
      alert("Código CVV invalido")
      return false;
    }

    return true;
  }

}

interface BookInfo {
  status: number;
  message: string;
}