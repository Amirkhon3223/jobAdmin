import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { VacancySettingsService } from '../../../services/vacancy-settings.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Vacancy } from '../../../models/vacancy';

@Component({
  selector: 'app-post-vacancy',
  templateUrl: './post-vacancy.component.html',
  styleUrls: ['./post-vacancy.component.css']
})

export class PostVacancyComponent implements AfterViewInit{
  @ViewChild('wysiwyg', { static: true }) wysiwyg!: ElementRef;

  vacancyForm: FormGroup;
  vacancies: Vacancy[] = [];

  constructor(
    private vacancyService: VacancySettingsService,
    private fb: FormBuilder,
  ) {
    this.vacancyForm = this.fb.group({
      title: ['', Validators.required],
      type: [''],
      city: [''],
      employmentType: [''],
      description: ['']
    });
  }

  ngAfterViewInit() {
    const iframe = this.wysiwyg.nativeElement;
    const iframeDocument = iframe.contentDocument || iframe.contentWindow?.document;

    if (iframeDocument) {
      if (iframeDocument.readyState === 'complete') {
        iframeDocument.designMode = 'on';
        this.init();
      } else {
        iframeDocument.onload = () => {
          iframeDocument.designMode = 'on';
          this.init();
        };
      }
    }
  }

  init(): void {
    const iframe = this.wysiwyg.nativeElement;
    const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
    iframeDoc.designMode = 'on';
  }

  formatBold(): void {
    document.execCommand('bold', false, '');
  }
  formatItalic(): void {
    document.execCommand('italic', false, '');
  }
  formatUnderline(): void {
    document.execCommand('underline', false, '');
  }
  formatHeading(): void {
    const iframe = this.wysiwyg.nativeElement;
    const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
    const h1 = iframeDoc.createElement('h1');
    h1.textContent = 'Заголовок';
    iframeDoc.body.appendChild(h1);
  }
  formatBulletList(): void {
    const iframe = this.wysiwyg.nativeElement;
    const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
    iframeDoc.execCommand('insertUnorderedList', false, null);
  }


  async addVacancy() {
    const iframe = this.wysiwyg.nativeElement;
    const iframeDocument = iframe.contentDocument || iframe.contentWindow?.document;

    if (iframeDocument) {
      const iframeBody = iframeDocument.body;

      if (iframeBody) {
        const descriptionValue = iframeBody.innerHTML;
        this.vacancyForm.get('description')?.setValue(descriptionValue);
      }
    }

    try {
      const newVacancy = await this.vacancyService.addVacancy(this.vacancyForm.value);
      console.log('Вакансия успешно добавлена:', newVacancy);
      this.vacancies.unshift(newVacancy);
      this.vacancyForm.reset();
    } catch (error) {
      console.error('Ошибка при добавлении вакансии:', error);
    }
  }



}
