import { Component } from '@angular/core';
import {VacancySettingsService} from "../../../services/vacancy-settings.service";
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import {Vacancy} from "../../../models/vacancy"; // Импортируйте FormBuilder и FormArray

@Component({
  selector: 'app-post-vacancy',
  templateUrl: './post-vacancy.component.html',
  styleUrls: ['./post-vacancy.component.css']
})
export class PostVacancyComponent {
  vacancyForm: FormGroup; // Инициализируйте FormGroup
  vacancies!: Vacancy[];
  lists: FormArray; // Добавьте это поле

  constructor(
    private vacancyService: VacancySettingsService,
    private fb: FormBuilder // Внедрите FormBuilder
  ) {
    this.lists = this.fb.array([]); // Инициализируйте список здесь

    // Инициализация массива vacancies
    this.vacancies = [];

    this.vacancyForm = this.fb.group({
      id: [0],
      title: ['', Validators.required],
      type: [''],
      region: [''],
      city: [''],
      employmentType: [''],
      description: [''],
      sections: this.fb.array([]),
      lists: this.lists // Свяжите список с формой
    });
  }

  get sections(): FormArray {
    return this.vacancyForm.get('sections') as FormArray;
  }

  addSection() {
    const newSection = this.fb.group({
      type: ['heading'],
      title: ['', Validators.required],
      describe: ['']
    });
    this.sections.push(newSection);
  }

  removeSection(index: number) {
    this.sections.removeAt(index);
  }

  addList() {
    const newList = this.fb.group({
      type: ['list'],
      title: ['', Validators.required],
      items: this.fb.array([''], Validators.required)
    });
    this.lists.push(newList);
  }

  removeList(index: number) {
    this.lists.removeAt(index);
  }

  removeItemFromList(listIndex: number, itemIndex: number) {
    const items = this.lists.at(listIndex).get('items') as FormArray;
    items.removeAt(itemIndex);
  }

  addItemToList(listIndex: number) {
    const items = this.lists.at(listIndex).get('items') as FormArray;
    items.push(this.fb.control('', Validators.required));
  }

  trackByIndex(index: number, item: any): number {
    return index;
  }

  addVacancy() {
    this.vacancyService.addVacancy(this.vacancyForm.value).subscribe(newVacancy => {
      console.log('Вакансия успешно добавлена:', newVacancy);

      // После успешного добавления, добавьте новую вакансию в начало массива
      this.vacancies.unshift(newVacancy);

      // Очистите форму, если это необходимо
      this.vacancyForm.reset();
    }, error => {
      console.error('Ошибка при добавлении вакансии:', error);
    });
  }

}
