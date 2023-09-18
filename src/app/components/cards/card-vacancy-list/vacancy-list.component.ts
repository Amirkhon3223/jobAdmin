import {Component, Input, OnInit} from '@angular/core';
import {VacancySettingsService} from "../../../services/vacancy-settings.service";
import {Vacancy} from "../../../models/vacancy";
import {MatDialog} from '@angular/material/dialog';
import {EditVacancyComponent} from '../../edit-vacancy/edit-vacancy.component';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';

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
    // private toast: HotToastService,
    private sanitizer: DomSanitizer
  ) {  }

  onPageChanged(pageNumber: number): void {
    this.currentPage = pageNumber;
    this.getVacancies();
  }

  sanitizeDescription(description: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(description);
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
          const vacanciesPerPage = 10; // количество вакансий, отображаемых на одной странице
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

  openEditModal(vacancy: Vacancy): void {
    const dialogRef = this.dialog.open(EditVacancyComponent, {
      data: {vacancy: vacancy}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getVacancies();
      }
    });
  }
}
