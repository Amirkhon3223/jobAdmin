import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthenticated = false;
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);

  // Observable для оповещения компонентов об изменениях в аутентификации
  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor() {
    // Проверка наличия сохраненных данных пользователя в локальном хранилище
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      this.isAuthenticated = true;
      this.isAuthenticatedSubject.next(true);
    }
  }

  login(username: string, password: string): Observable<any> {
    const apiUrl = 'http://localhost:8080/login';

    // Выполняем запрос на сервер для аутентификации
    return new Observable((observer) => {
      fetch(apiUrl, {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.message === 'Аутентификация успешна') {
            // Аутентификация успешна
            this.isAuthenticated = true;
            this.isAuthenticatedSubject.next(true); // Оповещаем подписчиков

            // Сохраняем информацию о пользователе в локальном хранилище
            const user = { username: username, /* другие данные пользователя */ };
            localStorage.setItem('user', JSON.stringify(user));

            // Возвращаем информацию о пользователе
            observer.next(data);
            observer.complete();
          } else {
            // Аутентификация не удалась
            this.isAuthenticated = false;
            this.isAuthenticatedSubject.next(false); // Оповещаем подписчиков

            // Возвращаем ошибку
            observer.error(data);
          }
        })
        .catch((error) => {
          // Обработка ошибок при запросе
          console.error('Ошибка при запросе на сервер:', error);
          this.isAuthenticated = false;
          this.isAuthenticatedSubject.next(false); // Оповещаем подписчиков

          // Возвращаем ошибку
          observer.error({ message: 'Произошла ошибка при выполнении запроса' });
        });
    });
  }

  logout(): void {
    const apiUrl = 'http://localhost:8080/logout';

    fetch(apiUrl, {
      method: 'POST',
    })
      .then((response) => {
        if (response.ok) {
          // Выход пользователя успешен
          this.isAuthenticated = false;
          this.isAuthenticatedSubject.next(false); // Оповещаем подписчиков

          // Удаляем информацию о пользователе из локального хранилища
          localStorage.removeItem('user');
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
