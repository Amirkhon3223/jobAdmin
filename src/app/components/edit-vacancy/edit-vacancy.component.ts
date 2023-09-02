import { Component } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {VacancySettingsService} from "../../services/vacancy-settings.service";

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
    private router: Router
  ) { }

  ngOnInit(): void {
    // Получаем ID вакансии из параметра маршрута
    this.vacancyId = +this.route.snapshot.paramMap.get('id')!;
    // Загружаем данные о вакансии
    this.loadVacancy();
  }

  loadVacancy(): void {
    this.vacancyService.getVacancyById(this.vacancyId).subscribe(vacancy => {
      this.vacancy = vacancy;
    });
  }

  updateVacancy(): void {
    this.vacancyService.updateVacancy(this.vacancy).subscribe(() => {
      // После обновления вакансии, можно перенаправить пользователя обратно на список вакансий
      this.router.navigate(['/vacancies']);
    });
  }
}
