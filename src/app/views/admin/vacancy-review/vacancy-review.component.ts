import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {VacancySettingsService} from "../../../services/vacancy-settings.service";
import {Vacancy} from "../../../models/vacancy";
import {DomSanitizer, SafeHtml} from "@angular/platform-browser";

@Component({
  selector: 'app-vacancy-review',
  templateUrl: './vacancy-review.component.html',
  styleUrls: ['./vacancy-review.component.css']
})
export class VacancyReviewComponent implements OnInit {
  vacancy: Vacancy | null = null;
  vacancies: Vacancy[] = [];
  isLoading = true;

  constructor(
    private cd: ChangeDetectorRef,
    private route: ActivatedRoute,
    private vacancyService: VacancySettingsService,
    private sanitizer: DomSanitizer // Внедрите DomSanitizer здесь
  ) {
  }

  sanitizeDescription(description: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(description);
  }

  async ngOnInit() {
    try {
      this.vacancies = await this.vacancyService.getVacancies();
      this.isLoading = false;

      this.route.params.subscribe(async params => {
        const vacancyId = +params['id'];
        await this.updateData(vacancyId);
        console.log(this.vacancy);

        // Добавьте вызов detectChanges после получения данных
        this.cd.detectChanges();
      });
    } catch (error) {
      console.error('An error occurred:', error);
      throw error;
    }
  }

  async updateData(vacancyId: number) {
    try {
      this.vacancy = await this.vacancyService.getVacancyById(vacancyId);
    } catch (error) {
    }
  }
}
