import {Component, Input, OnInit} from '@angular/core';
import {VacancySettingsService} from "../../../services/vacancy-settings.service";
import {Vacancy} from "../../../models/vacancy";
import {MatDialog} from '@angular/material/dialog';
import {EditVacancyComponent} from '../../edit-vacancy/edit-vacancy.component';

@Component({
  selector: 'app-card-vacancy-list',
  templateUrl: './vacancy-list.component.html',
  styleUrls: ['./vacancy-list.component.css']
})

export class VacancyListComponent implements OnInit {
  vacancies!: Vacancy[];
  showEditModal = true;

  currentPage: number = 1; // начальная страница
  totalPages: number = 1; // общее количество страниц


  constructor(
    private dialog: MatDialog,
    private vacancySetting: VacancySettingsService,
    // private toast: HotToastService
  ) {  }

  onPageChanged(pageNumber: number): void {
    this.currentPage = pageNumber;
    this.getVacancies(); // Обновите список вакансий, например, снова вызвав getVacancies()
  }


  ngOnInit(): void {
    this.getVacancies();
  }

  getVacancies(): void {
    this.vacancySetting.getVacancies().subscribe(
      vacancies => {
        if (vacancies && Array.isArray(vacancies) && vacancies.length > 0) {
          // Получаем все вакансии с сервера
          this.vacancies = vacancies;

          // Обновляем totalPages на основе общего количества вакансий и количества на странице
          const vacanciesPerPage = 10; // Замените на количество вакансий, отображаемых на одной странице
          this.totalPages = Math.ceil(vacancies.length / vacanciesPerPage);

          // Отображаем только вакансии для текущей страницы
          const startIndex = (this.currentPage - 1) * vacanciesPerPage;
          const endIndex = startIndex + vacanciesPerPage;
          this.vacancies = this.vacancies.slice(startIndex, endIndex);
        } else {
          console.error('Received empty or invalid data from the server:', vacancies);
        }
      },
      error => {
        console.error('An error occurred while fetching vacancies:', error);
      }
    );
  }


  deleteVacancy(id: number): void {
    this.vacancySetting.deleteVacancy(id).subscribe(() => {
      this.getVacancies();
    });
    // this.toast.success('Successfully toasted!')
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

  openEditModal(vacancy: Vacancy): void {
    const dialogRef = this.dialog.open(EditVacancyComponent, {
      data: {vacancy: vacancy} // Убедитесь, что vacancy - это объект вакансии
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getVacancies();
      }
    });
  }
}
