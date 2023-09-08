// login.component.ts
import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private router: Router

  ) {}

  ngOnInit(): void {}

  onLoginClick(): void {
    const username = (document.getElementById('username') as HTMLInputElement).value;
    const password = (document.getElementById('password') as HTMLInputElement).value;
    this.authService.login(username, password);

    this.authService.isAuthenticated$.subscribe((isAuthenticated) => {
      if (isAuthenticated) {
        // Пользователь аутентифицирован, перенаправьте его на другую страницу
        this.router.navigate(['/admin/dashboard']);
      }
    });
  }
}
