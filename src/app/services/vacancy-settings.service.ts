import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, Observable, throwError} from "rxjs";
import {Vacancy} from "../models/vacancy";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class VacancySettingsService {

  private apiUrl = `${environment.apiBaseUrl}/vacancy/`;

  constructor(private http: HttpClient) {
  }


  addVacancy(vacancy: Vacancy): Observable<Vacancy> {
    return this.http.post<Vacancy>(`${this.apiUrl}`, vacancy);
  }

  // Получение списка вакансий
  getVacancies(): Observable<Vacancy[]> {
    return this.http.get<Vacancy[]>(this.apiUrl).pipe(
      catchError(error => {
        console.error('An error occurred:', error);
        return throwError(error);
      })
    );
  }

  getVacancyById(id: number): Observable<Vacancy> {
    return this.http.get<Vacancy>(`${this.apiUrl}${id}`);
  }

  updateVacancy(vacancy: any): Observable<any> {
    // Реализация обновления вакансии, отправка данных на сервер
    return this.http.put<any>(`${this.apiUrl}${vacancy.id}`, vacancy).pipe(
      catchError(error => {
        console.error('An error occurred:', error);
        return throwError(error);
      })
    );
  }

  // Удаление вакансии по ID
  deleteVacancy(id: number): Observable<void> {
    return this.http.delete<any>(`${this.apiUrl}${id}`)
  }
}
