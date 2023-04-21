import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Token } from 'src/app/interfaces/token';
import { TokenClientService } from 'src/app/service/tokenClient.service';

@Component({
  selector: 'app-landing-festival',
  templateUrl: './landing-festival.component.html',
  styleUrls: ['./landing-festival.component.css']
})
export class LandingFestivalComponent {
  token!:Token;
  infoToken:any;
  dropdownVisible = false;
  isLoggedIn = false;

  constructor( private TokenClientService: TokenClientService, private router: Router,) {
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

  toggleDropdown() {
    this.dropdownVisible = !this.dropdownVisible;
  }

  logout(){
    this.TokenClientService.RemoveToken();
  }
}
