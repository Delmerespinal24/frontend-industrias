import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/service/token.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  constructor(private TokenService:TokenService, private router:Router){}

  logout(){
    // if (this.authservice.isLoggedIn()===true) {
    //   this.TokenService.RemoveToken();
    // } else {
    //   console.log(false);
    // }
  }
}
