// auth.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import {AuthService} from "./services/auth.service";
@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree {
    if (this.authService.isAuthenticatedUser()) {
      return true;
    } else {
      // Если пользователь не аутентифицирован, перенаправьте его на страницу входа
      return this.router.createUrlTree(['/auth/login']);
    }
  }
}
