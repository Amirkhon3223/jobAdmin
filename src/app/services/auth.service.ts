import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';

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
        body: JSON.stringify({username, password}),
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.message === 'Аутентификация успешна') {
            this.isAuthenticated = true;
            this.isAuthenticatedSubject.next(true);

            const user = {username};
            localStorage.setItem('user', JSON.stringify(user));

            observer.next(data);
            observer.complete();
          } else {
            this.isAuthenticated = false;
            this.isAuthenticatedSubject.next(false);
            observer.error(data);
          }
        })
        .catch((error) => {
          console.error('Ошибка при запросе на сервер:', error);
          this.isAuthenticated = false;
          this.isAuthenticatedSubject.next(false);
          observer.error({message: 'Произошла ошибка при выполнении запроса'});
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
          this.isAuthenticatedSubject.next(false);
          // Удаляем информацию о пользователе из локального хранилища
          localStorage.removeItem('user');
        } else {
          // Произошла ошибка при выходе пользователя
          console.error('Ошибка при выходе пользователя:', response.statusText);
          this.isAuthenticated = false;
          this.isAuthenticatedSubject.next(false);
        }
      })
      .catch((error) => {
        // Обработка ошибок при запросе
        console.error('Ошибка при запросе на сервер:', error);
        this.isAuthenticated = false;
        this.isAuthenticatedSubject.next(false);
      });
  }


  isAuthenticatedUser(): boolean {
    return this.isAuthenticated;
  }
}
