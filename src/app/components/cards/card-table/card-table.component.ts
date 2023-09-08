import { Component, OnInit, Input } from '@angular/core';
import {VacancyApplicationService} from "../../../services/vacancy-application.service";

@Component({
  selector: 'app-card-table',
  templateUrl: './card-table.component.html',
})
export class CardTableComponent implements OnInit {
  applications: any[] = [];

  constructor(private vacancyAppService: VacancyApplicationService) {}

  ngOnInit(): void {
    this.vacancyAppService.getApplications().subscribe((data) => {
      this.applications = data;
    });
  }

  // Метод для удаления заявки
  deleteApplication(applicationId: number): void {
    // Вызовите ваш сервис для удаления заявки по ID
    this.vacancyAppService.deleteApplication(applicationId).subscribe(() => {
      // Обновите список заявок после удаления
      this.applications = this.applications.filter((app) => app.id !== applicationId);
    });
  }
}
