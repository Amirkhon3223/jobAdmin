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
    this.authService.login(username, password).subscribe((response) => {
      if (response.message === 'Аутентификация успешна') {
        // Сохраните данные пользователя в локальное хранилище
        localStorage.setItem('user', JSON.stringify(response.user));

        // Перенаправьте пользователя на защищенные страницы
        this.router.navigate(['/admin/dashboard']);
      }
    });
  }

}
