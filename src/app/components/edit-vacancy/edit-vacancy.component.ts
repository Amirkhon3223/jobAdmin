import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {VacancySettingsService} from "../../services/vacancy-settings.service";
import {FormsModule} from '@angular/forms';


@Component({
  selector: 'app-edit-vacancy',
  templateUrl: './edit-vacancy.component.html',
  styleUrls: ['./edit-vacancy.component.css']
})
export class EditVacancyComponent {
  vacancy: any = {}; // Объект для хранения данных о вакансии
  vacancyId: number = 0;

  constructor(
    private route: ActivatedRoute,
    private vacancyService: VacancySettingsService,
    private router: Router,
  ) {  }

  ngOnInit(): void {
    // Получаем ID вакансии из параметра маршрута
    this.vacancyId = +this.route.snapshot.paramMap.get('id')!;
    // Загружаем данные о вакансии
    this.loadVacancy();
  }

  loadVacancy(): void {
    this.vacancyService.getVacancyById(this.vacancyId)
      .subscribe(vacancy => {
        this.vacancy = vacancy;
      });
  }

  // Метод для добавления элемента в секцию списка если она есть
  addItem(sectionIndex: number): void {
    const newListItem = 'Добавьте свой элемент';
    if (this.vacancy.sections[sectionIndex].type === 'list') {
      this.vacancy.sections[sectionIndex].items.push(newListItem);
    }
  }

  removeItem(sectionIndex: number, itemIndex: number): void {
    if (this.vacancy.sections[sectionIndex].type === 'list') {
      this.vacancy.sections[sectionIndex].items.splice(itemIndex, 1);
    }
  }

  trackByIndex(index: number, item: any): number {
    return index;
  }

  updateVacancy(): void {
    this.vacancyService.updateVacancy(this.vacancy).subscribe(() => {
      // После обновления вакансии, обратно идет на список вакансий
      this.router.navigate(['/admin/dashboard']);
    });
  }

}
