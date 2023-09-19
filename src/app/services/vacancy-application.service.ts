import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class VacancyApplicationService {

  private apiUrl = 'http://localhost:3001/vacancyrq';

  constructor(private http: HttpClient) {}

  getApplications(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}`);
  }

  deleteApplication(applicationId: number): Observable<void> {
    const url = `${this.apiUrl}/${applicationId}`;
    return this.http.delete<void>(url);
  }
}
