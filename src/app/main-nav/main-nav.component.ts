import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css'],
})
export class MainNavComponent {
  constructor(private authservice: AuthService) {}

  isAuthenticated(): boolean {
    return this.authservice.checkAuthenticated() ? true : false;
  }
  getUsername(): string {
    return this.authservice.getUsername();
  }
  logOut(): void {
    this.authservice.logout();
  }
}
