import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { USERS } from '../mock-users';
import { UUID } from 'uuid-generator-ts';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  uuid = new UUID();

  constructor(private router: Router) {}

  checkAuthenticated(): boolean {
    return localStorage.getItem('token') !== null ? true : false;
  }

  isAdmin(): boolean {
    return localStorage.getItem('permission') == 'admin' ? true : false;
  }

  getUsername(): string {
    return localStorage.getItem('name') as string;
  }

  getToken(): string {
    return localStorage.getItem('token') as string;
  }

  async login(email: string, password: string): Promise<boolean> {
    for (var user of USERS) {
      if (user.email == email && user.password == password) {
        localStorage.setItem('token', this.uuid.getDashFreeUUID());
        localStorage.setItem('permission', user.permission);
        localStorage.setItem('name', user.name);
        return true;
      }
    }
    return false;
  }

  async logout(): Promise<void> {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
