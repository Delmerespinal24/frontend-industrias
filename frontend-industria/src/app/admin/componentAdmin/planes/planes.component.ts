import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { InfoPagoAdmin } from 'src/app/interfaces/info-pago-admin';
import { TarjetaUsuario } from 'src/app/interfaces/tarjeta-usuario';
import { Token } from 'src/app/interfaces/token';
import { PagoService } from 'src/app/service/pago.service';
import { TokenService } from 'src/app/service/token.service';

@Component({
  selector: 'app-planes',
  templateUrl: './planes.component.html',
  styleUrls: ['./planes.component.css']
})
export class PlanesComponent {
  openTab = 1;
  planSeleccionado=0;
  nombrePlan='';
  precioPlan=0;
  infotarjetaUsuario!:TarjetaUsuario;
  finPlan='';
  infoPago!:InfoPagoAdmin;
  idUsuario='';

  
  token!:Token;
  infoToken:any;



  constructor(private TokenService:TokenService,private solicitudPago:PagoService, private router:Router){

    this.token={"token":this.TokenService.getToken()}

      this.TokenService.decodedToken(this.token).subscribe({
        next: res=>{
          this.infoToken=res;
          console.log("info token ",this.infoToken)
        },
        error: error=>{
          console.log(error);
        }
      });

    let inicioMes = new Date();
    let finMes = new Date(inicioMes.getFullYear(), inicioMes.getMonth(), inicioMes.getDate());;
    // let cambioInicioMes= inicioMes.toLocaleDateString('es-ES');
    finMes.setMonth(finMes.getMonth() + 1);

    this.finPlan=finMes.toISOString().slice(0, 10);;
    
    console.log(inicioMes, finMes)
  }

  toggleTabs($tabNumber: number){
    this.openTab = $tabNumber;
  }

  pagoForm=new FormGroup({
    numeroTarjeta: new FormControl('', [Validators.required]),
    fechaVencimiento: new FormControl('', [Validators.required]),
    codigoCVV: new FormControl('',[Validators.required])
});

  get numeroTarjetaControl():FormControl{
    return this.pagoForm.get('numeroTarjeta') as FormControl;
  }

  get fechaVencimientoControl():FormControl{
    return this.pagoForm.get('fechaVencimiento')as FormControl;
  }

  get codigoCVVControl():FormControl{
    return this.pagoForm.get('codigoCVV') as FormControl;
  }

  plan(numeroPlan:number){
    this.planSeleccionado = numeroPlan;

    if (this.planSeleccionado==1) {
      this.nombrePlan='Basico';
      this.precioPlan=59;
    }if (this.planSeleccionado==2) {
      this.nombrePlan='Estandar'
      this.precioPlan=199;
    }if(this.planSeleccionado==3) {
      this.nombrePlan='Profesional'
      this.precioPlan=256;
    }else{
      
    }

    this.toggleTabs(2)
    console.log('plan seleccionado: ',this.planSeleccionado, 'Nombre de plan: ', this.nombrePlan, 'precio plan: ', this.precioPlan)
  }

  pago(){

  let tarjetaUsuario: TarjetaUsuario = {
    numeroTarjeta: parseInt('' + this.pagoForm.get('numeroTarjeta')?.value),
    codigoCVV: parseInt('' + this.pagoForm.get('codigoCVV')?.value),
    fechaVencimiento: '' + this.pagoForm.get('fechaVencimiento')?.value,
  };

  this.infotarjetaUsuario = {
    numeroTarjeta: parseInt('' + this.pagoForm.get('numeroTarjeta')?.value),
    codigoCVV: parseInt('' + this.pagoForm.get('codigoCVV')?.value),
    fechaVencimiento: '' + this.pagoForm.get('fechaVencimiento')?.value,
  };

    this.infoPago=({
      noTarjeta:this.numeroTarjetaControl.value,
      fechaVencimientoT:this.fechaVencimientoControl.value,
      codigoCVV:this.codigoCVVControl.value,
      tipoPlan:this.nombrePlan,
      fechaFin:this.finPlan,
      precio:this.precioPlan ,
      idUsuario: this.infoToken.data[0].idUsuario,
    })


    console.log('info: ',tarjetaUsuario)

    this.toggleTabs(3)
  }

  confirmacionPago(){

    this.solicitudPago.pagoTarjeta(this.infoPago).subscribe(res=>{

      let info:BookInfo = <any>res

      console.log('message:',info.message)
      console.log('status:',info.status)

      if(info.status == 200){

        alert("TARJETA BUENA");
        this.router.navigate(['']);
      }else if(info.status == 400){ 
 
        alert("Ha ocurrido un problema.");
      }

    })

    console.log('al backend: ',this.infoPago)
  }

}

interface BookInfo {
  status : number,
  message: string,
  token: string
}