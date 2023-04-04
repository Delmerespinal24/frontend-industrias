import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Token } from 'src/app/interfaces/token';
import { TokenService } from 'src/app/service/token.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  token!:Token;
  infoToken:any;
  dropdownVisible = false;
  isLoggedIn = false;

  constructor( private tokenService: TokenService, private router: Router,) {
    this.token = { token: this.tokenService.getToken() };

    if (this.token.token) {
      this.isLoggedIn = true;

      this.tokenService.decodedToken(this.token).subscribe({
        next: res => {
          this.infoToken = res.data;
          console.log('info token', this.infoToken);
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
    this.tokenService.RemoveToken();
  }
}


