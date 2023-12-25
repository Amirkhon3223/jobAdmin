import {Component, Input, OnInit} from '@angular/core';
import {VacancySettingsService} from '../../../services/vacancy-settings.service';
import {Vacancy} from '../../../models/vacancy';
import {MatDialog} from '@angular/material/dialog';
import {EditVacancyComponent} from '../../edit-vacancy/edit-vacancy.component';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';

@Component({
  selector: 'app-card-vacancy-list',
  templateUrl: './vacancy-list.component.html',
})

export class VacancyListComponent implements OnInit {
  vacancies!: Vacancy[];
  showEditModal = true;

  currentPage = 1;
  totalPages = 1;

  constructor(
    private dialog: MatDialog,
    private vacancySetting: VacancySettingsService,
    private sanitizer: DomSanitizer
  ) {
  }

  onPageChanged(pageNumber: number): void {
    this.currentPage = pageNumber;
    this.getVacancies();
  }

  sanitizeDescription(description: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(description);
  }

  async ngOnInit(): Promise<void> {
    await this.getVacancies(); // Ждем, пока получим вакансии
  }

  async getVacancies(): Promise<void> {
    try {
      const vacancies = await this.vacancySetting.getVacancies();
      if (vacancies && Array.isArray(vacancies) && vacancies.length > 0) {
        // Получаем все вакансии с сервера
        this.vacancies = vacancies;

        // Обновляем totalPages на основе общего кол.вакансий и кол.на странице
        const vacanciesPerPage = 10; // кол.вакансий, отображаемых на одной странице
        this.totalPages = Math.ceil(vacancies.length / vacanciesPerPage);
        // Отображаем только вакансии для текущей страницы
        const startIndex = (this.currentPage - 1) * vacanciesPerPage;
        const endIndex = startIndex + vacanciesPerPage;
        this.vacancies = this.vacancies.slice(startIndex, endIndex);
      } else {
        console.error('Received empty or invalid data from the server:', vacancies);
      }
    } catch (error) {
      console.error('An error occurred while fetching vacancies:', error);
    }
  }

  async deleteVacancy(id: number): Promise<void> {
    try {
      await this.vacancySetting.deleteVacancy(id);
      await this.getVacancies(); // После удаления апдейт список вакансий
    } catch (error) {
      console.error('An error occurred while deleting vacancy:', error);
    }
  }

  openEditModal(vacancy: Vacancy): void {
    const dialogRef = this.dialog.open(EditVacancyComponent, {
      data: {id: vacancy.id} // Передаем id вакансии
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getVacancies(); // После закрытия модального окна апдейтим список вакансий
      }
    });
  }
}
