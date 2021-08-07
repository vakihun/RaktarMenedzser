import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { take } from "rxjs/operators";
import { Subscription } from "rxjs";

@Component({
  selector: 'app-login',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit, OnDestroy {
  loginForm: FormGroup;
  loginInvalid = false;
  subscription: Subscription;

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private router: Router, private authService: AuthService) {
  }

  ngOnInit() {
    this.subscription = this.authService.user.pipe(
      take(1)).subscribe(user => {
      const isAuth = !!user;
      if (isAuth) {
        this.router.navigate(['/']);
      }
    });
    this.loginForm = this.fb.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', Validators.required],
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onSubmit() {
    this.loginInvalid = false;
    const email = this.loginForm.get('email').value;
    const password = this.loginForm.get('password').value;
    if (this.authService.login(email, password)) {
      this.router.navigate(['/things']);
    } else {
      this.loginInvalid = true;
    }
  }
}
