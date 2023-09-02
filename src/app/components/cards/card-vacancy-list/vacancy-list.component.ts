import {Component, OnInit} from '@angular/core';
import {VacancySettingsService} from "../../../services/vacancy-settings.service";

@Component({
  selector: 'app-card-vacancy-list',
  templateUrl: './vacancy-list.component.html',
  styleUrls: ['./vacancy-list.component.css']
})

export class VacancyListComponent implements OnInit {
  vacancies: any[] = []

  constructor(private vacancySetting: VacancySettingsService) { }

  ngOnInit(): void {
    this.getVacancies();
  }

  getVacancies(): void {
    this.vacancySetting.getVacancies().subscribe(vacancies => {
      this.vacancies = vacancies;
    })
  }

  deleteVacancy(id: number): void{
    this.vacancySetting.deleteVacancy(id).subscribe(() =>{
      this.getVacancies();
    })
  }

  truncateDescription(description: any, maxLength: number): string {
    if (description.length > maxLength) {
      let truncated = description.slice(0, maxLength);
      const lastChar = truncated[truncated.length - 1];
      // Проверяем, является ли последний символ буквой
      if (!/[a-zA-Z]/.test(lastChar)) {
        truncated = truncated.slice(0, -1) // Удаляем последний символ, который не является буквой
        truncated = truncated.replace(/\s+$/, ''); // Удаляем пробельные символы перед многоточием, если есть
      }
      return truncated + '...';
    }
    return description.slice(0, -1) + '...';
  }

}
