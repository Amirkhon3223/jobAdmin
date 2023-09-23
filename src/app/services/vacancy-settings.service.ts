import { Injectable } from '@angular/core';
import axios from 'axios';
import { Vacancy } from '../models/vacancy';
import {API_BASE_URL} from "../../../api.config";

@Injectable({
  providedIn: 'root'
})
export class VacancySettingsService {

  private apiUrl = API_BASE_URL;

  constructor() {}

  async addVacancy(vacancy: Vacancy): Promise<Vacancy> {
    try {
      const response = await axios.post<Vacancy>(`${this.apiUrl}`, vacancy);
      return response.data;
    } catch (error) {
      console.error('An error occurred:', error);
      throw error;
    }
  }

  async getVacancies(): Promise<Vacancy[]> {
    try {
      const response = await axios.get<Vacancy[]>(this.apiUrl);
      return response.data;
    } catch (error) {
      console.error('An error occurred:', error);
      throw error;
    }
  }

  async getVacancyById(id: number): Promise<Vacancy> {
    try {
      const response = await axios.get<Vacancy>(`${this.apiUrl}/${id}`);
      return response.data;
    } catch (error) {
      console.error('An error occurred:', error);
      throw error;
    }
  }

  async updateVacancy(vacancy: any): Promise<any> {
    try {
      const response = await axios.put<any>(`${this.apiUrl}/${vacancy.id}`, vacancy);
      return response.data;
    } catch (error) {
      console.error('An error occurred:', error);
      throw error;
    }
  }

  async deleteVacancy(id: number): Promise<void> {
    try {
      await axios.delete<any>(`${this.apiUrl}/${id}`);
    } catch (error) {
      console.error('An error occurred:', error);
      throw error;
    }
  }
}
