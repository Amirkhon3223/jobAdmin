// import {AfterViewInit, Component, ElementRef} from '@angular/core';
// import {VacancySettingsService} from '../../../services/vacancy-settings.service';
// import {FormBuilder, FormGroup, FormArray, Validators} from '@angular/forms';
// import {Vacancy} from '../../../models/vacancy';
//
// @Component({
//   selector: 'app-post-vacancy',
//   templateUrl: './post-vacancy.component.html',
//   styleUrls: ['./post-vacancy.component.css']
// })
// export class PostVacancyComponent {
//
//
//   vacancyForm: FormGroup;
//   vacancies!: Vacancy[];
//   lists: FormArray;
//
//   constructor(
//     private elementRef: ElementRef,
//     private vacancyService: VacancySettingsService,
//     private fb: FormBuilder
//   ) {
//     this.lists = this.fb.array([]);
//
//     this.vacancies = [];
//
//     this.vacancyForm = this.fb.group({
//       id: [0],
//       title: ['', Validators.required],
//       type: [''],
//       region: [''],
//       city: [''],
//       employmentType: [''],
//       sections: this.fb.array([]),
//       // lists: this.lists
//     });
//   }
//
//   get sections(): FormArray {
//     return this.vacancyForm.get('sections') as FormArray;
//   }
//
//   addSection() {
//     const newSection = this.fb.group({
//       type: ['heading'],
//       title: ['', Validators.required],
//       describe: ['']
//     });
//     this.sections.push(newSection);
//   }
//
//   removeSection(index: number) {
//     this.sections.removeAt(index);
//   }
//
//   addList() {
//     const newList = this.fb.group({
//       type: ['list'],
//       title: ['', Validators.required],
//       items: this.fb.array([''], Validators.required)
//     });
//     this.lists.push(newList);
//   }
//
//   removeList(index: number) {
//     this.lists.removeAt(index);
//   }
//
//   removeItemFromList(listIndex: number, itemIndex: number) {
//     const items = this.lists.at(listIndex).get('items') as FormArray;
//     items.removeAt(itemIndex);
//   }
//
//   addItemToList(listIndex: number) {
//     const items = this.lists.at(listIndex).get('items') as FormArray;
//     items.push(this.fb.control('', Validators.required));
//   }
//
//   init(): void {
//     const iframe = this.elementRef.nativeElement.querySelector('iframe');
//     iframe.addEventListener('load', () => {
//       iframe.contentDocument.designMode = 'on';
//     });
//   }
//
//
//   trackByIndex(index: number, item: any): number {
//     return index;
//   }
//
//   addVacancy() {
//     this.vacancyService.addVacancy(this.vacancyForm.value).subscribe(newVacancy => {
//       console.log('Вакансия успешно добавлена:', newVacancy);
//       this.vacancies.unshift(newVacancy);
//
//       this.vacancyForm.reset();
//     }, error => {
//       console.error('Ошибка при добавлении вакансии:', error);
//     });
//   }
// }
//
