import {ChangeDetectorRef, Component} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {VacancySettingsService} from "../../../services/vacancy-settings.service";
import {Vacancy} from "../../../models/vacancy";


@Component({
  selector: 'app-vacancy-review',
  templateUrl: './vacancy-review.component.html',
  styleUrls: ['./vacancy-review.component.css']
})
export class VacancyReviewComponent {
  vacancy: Vacancy | null = null
  vacancies: Vacancy[] = []
  isLoading = true; // Флаг загрузки


  constructor(
    private route: ActivatedRoute,
    private vacancyService: VacancySettingsService,
    public cd: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.vacancyService.getVacancies().subscribe(vacancies => {
      this.isLoading = false; // Окончание загрузки
      this.vacancies = vacancies;
    });

    this.route.params.subscribe(params => {
      const vacancyId = +params['id'];
      this.vacancyService.getVacancyById(vacancyId).subscribe(vacancy => {
        this.vacancy = vacancy;
        this.cd.detectChanges();
      });
    });
  }
}
