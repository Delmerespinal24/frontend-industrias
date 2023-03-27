import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Token } from 'src/app/interfaces/token';
import { TokenService } from 'src/app/service/token.service';

@Component({
  selector: 'app-perfil-admin',
  templateUrl: './perfil-admin.component.html',
  styleUrls: ['./perfil-admin.component.css']
})
export class PerfilAdminComponent {

  token!:Token;
  infoToken:any;

  constructor(
    
    private TokenService:TokenService, private router:Router) {

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

  }

ngOnit():void{


}

}
