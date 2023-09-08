import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class VacancyApplicationService {

  private apiUrl = ''; // Заменить на URL бекенда БД

  constructor(private http: HttpClient) {}

  getApplications(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/applications`);
  }
  deleteApplication(applicationId: number): Observable<void> {
    const url = `${this.apiUrl}/applications/${applicationId}`;
    return this.http.delete<void>(url);
  }
}
