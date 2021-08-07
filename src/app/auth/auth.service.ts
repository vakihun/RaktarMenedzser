import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {UUID} from 'uuid-generator-ts';
import {User} from "./user.model";
import {BehaviorSubject} from "rxjs";

interface MockedUser {
  name: string;
  email: string;
  password: string;
  role: Role;
}

export enum Role {
  User = 'User',
  Admin = 'Admin'
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  user = new BehaviorSubject<User>(null);
  private uuid = new UUID();
  private mockedUsers: MockedUser[] = [
    {
      name: 'TesztFelhasználó1',
      email: 'teszt1@gmail.com',
      password: '123456',
      role: Role.Admin,
    },
    {
      name: 'TesztFelhasználó2',
      email: 'teszt2@gmail.com',
      password: '123456',
      role: Role.User,
    },
  ];

  constructor(private router: Router) {}



  login(email: string, password: string) {
    const user = this.mockedUsers.find(obj => obj.email === email && obj.password == password);
    if (user) {
      const loggedInUser = new User(user.name, this.uuid.getDashFreeUUID(), user.role);
      this.user.next(loggedInUser);
      localStorage.setItem('userData', JSON.stringify(loggedInUser));
      return true;
    }
    return false;
  }

  logout() {
    this.user.next(null);
    localStorage.clear();
    this.router.navigate(['/auth']);
  }

  autoLogin() {
    const userData: User = JSON.parse(localStorage.getItem('userData'));
    if (!userData) {
      return;
    }
    this.user.next(userData);
  }
}
