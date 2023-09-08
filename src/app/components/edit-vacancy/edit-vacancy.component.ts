import {Component, Inject, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {VacancySettingsService} from "../../services/vacancy-settings.service";
import {FormsModule} from '@angular/forms';
import {Vacancy} from "../../models/vacancy";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {HotToastService} from "@ngneat/hot-toast";


@Component({
  selector: 'app-edit-vacancy',
  templateUrl: './edit-vacancy.component.html',
  styleUrls: ['./edit-vacancy.component.css']
})
export class EditVacancyComponent {
  @Input() showModal = true;
  @Input() vacancy: any = {};

  closeAnimationActive = false;

  closeModal() {
    this.closeAnimationActive = true;
    setTimeout(() => {
      this.showModal = false;
      this.closeAnimationActive = false;
    }, 300); // Подождите 300 миллисекунд (время анимации) перед закрытием модального окна
  }

  vacancyId: number = 0;

  constructor(
    public dialogRef: MatDialogRef<EditVacancyComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private vacancyService: VacancySettingsService,
    private router: Router,
    private toast: HotToastService
  ) {
    this.vacancy = data.vacancy; // Получаем данные о вакансии из MAT_DIALOG_DATA
  }

  ngOnInit(): void {
    // Получаем ID вакансии из параметра маршрута
    this.vacancyId = +this.data.vacancy.id;
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
    this.toast.success('Вакансия обновлено')
    this.closeModal()
  }

}
