// Ваш Angular компонент (например, ProfileComponent)
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
})
export class ProfileComponent implements OnInit {
  userProfile: any; // Переменная для хранения профиля пользователя

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    // Выполняем HTTP GET запрос для получения профиля пользователя
    this.http.get('/profile').subscribe(
      (response) => {
        this.userProfile = response; // Сохраняем профиль пользователя
      },
      (error) => {
        console.error('Ошибка:', error);
      }
    );
  }
}
