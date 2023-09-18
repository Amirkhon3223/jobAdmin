import { Component, OnInit } from '@angular/core';
import {VacancyApplicationService} from "../../../services/vacancy-application.service";
import {RequestViewComponent} from "../../../views/admin/request-view/request-view.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-card-table',
  templateUrl: './card-table.component.html',
})
export class CardTableComponent implements OnInit {
  applications: any[] = [];

  constructor(
    private vacancyAppService: VacancyApplicationService,
    private dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.vacancyAppService.getApplications().subscribe((data) => {
      this.applications = data;
    });
  }

  openModal(application: any) {
    const dialogRef = this.dialog.open(RequestViewComponent, {
      data: application, // Передайте данные в модальное окно
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
