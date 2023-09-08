import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class AuthService {

  private isAuthenticated = false;
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);

  // Observable для оповещения компонентов об изменениях в аутентификации
  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  login(username: string, password: string): void {
    const apiUrl = 'http://localhost:8080/login'; // Обратите внимание на измененный URL

    fetch(apiUrl, {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (response.ok) {
          // Аутентификация успешна
          this.isAuthenticated = true;
          this.isAuthenticatedSubject.next(true); // Оповещаем подписчиков
        } else {
          // Аутентификация не удалась
          this.isAuthenticated = false;
          this.isAuthenticatedSubject.next(false); // Оповещаем подписчиков
        }
      })
      .catch((error) => {
        // Обработка ошибок при запросе
        console.error('Ошибка при запросе на сервер:', error);
        this.isAuthenticated = false;
        this.isAuthenticatedSubject.next(false); // Оповещаем подписчиков
      });
  }

  logout(): void {
    const apiUrl = '';

    fetch(apiUrl, {
      method: 'POST',
    })
      .then((response) => {
        if (response.ok) {
          // Выход пользователя успешен
          this.isAuthenticated = false;
          this.isAuthenticatedSubject.next(false); // Оповещаем подписчиков
        } else {
          // Произошла ошибка при выходе пользователя
          console.error('Ошибка при выходе пользователя:', response.statusText);
          this.isAuthenticated = false;
          this.isAuthenticatedSubject.next(false); // Оповещаем подписчиков
        }
      })
      .catch((error) => {
        // Обработка ошибок при запросе
        console.error('Ошибка при запросе на сервер:', error);
        this.isAuthenticated = false;
        this.isAuthenticatedSubject.next(false); // Оповещаем подписчиков
      });
  }

  isAuthenticatedUser(): boolean {
    return this.isAuthenticated;
  }
}
