import { Component } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {VacancySettingsService} from "../../../services/vacancy-settings.service";
import {Vacancy} from "../../../models/vacancy";


@Component({
  selector: 'app-vacancy-review',
  templateUrl: './vacancy-review.component.html',
  styleUrls: ['./vacancy-review.component.css']
})
export class VacancyReviewComponent {
  vacancy: any;
  vacancies: Vacancy[] = []
  headings: string[] = [];
  paragraphs: string[] = [];
  lists: string[][] = [];

  constructor(
    //Вызываем компоненты и сервисы
    private route: ActivatedRoute,
    private vacancyService: VacancySettingsService,
    ) {
  }

  // Происходит инициализация, берется список(объекты из сервиса, где хранятся данные)...
  ngOnInit(): void {
    this.vacancyService.getVacancies().subscribe(vacancies => {
      this.vacancies = vacancies;

      this.vacancies.forEach(item => {
        this.headings = []; // Очищаем массив перед обработкой каждой вакансии
        this.paragraphs = []; // Очищаем массив перед обработкой каждой вакансии
        this.lists = []; // Очищаем массив перед обработкой каждой вакансии

        if (item.type === 'heading') {
          this.headings.push(item.description);
        } else if (item.type === 'paragraph') {
          this.paragraphs.push(item.description);
        } else if (item.type === 'list') {
          this.lists.push(item.description.split('\n')); // Предполагается, что пункты разделены символом новой строки
        }
      });
    });
    this.route.params.subscribe(params => {
      const vacancyId = +params['id'];
      this.vacancyService.getVacancyById(vacancyId).subscribe(vacancy => {
        this.vacancy = vacancy;
      });
    });
  }


}
