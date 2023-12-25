import {Component, OnInit} from '@angular/core';
import {VacancyApplicationService} from '../../../services/vacancy-application.service';
import {RequestViewComponent} from '../../../views/admin/request-view/request-view.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-card-table',
  templateUrl: './card-table.component.html',
})
export class CardTableComponent implements OnInit {
  applications: any[] = [];

  constructor(
    private vacancyAppService: VacancyApplicationService,
    private dialog: MatDialog,
  ) {
  }

  ngOnInit(): void {
    this.vacancyAppService.getApplications().subscribe((data) => {
      this.applications = data;
    });
  }

  // Открывам модалку :)
  openModal(application: any) {
    const dialogRef = this.dialog.open(RequestViewComponent, {
      data: application,
    });
  }

  // Метод для удаления заявки
  deleteApplication(applicationId: number): void {
    this.vacancyAppService.deleteApplication(applicationId).subscribe(() => {
      this.applications = this.applications.filter((app) => app.id !== applicationId);
    });
  }
}
