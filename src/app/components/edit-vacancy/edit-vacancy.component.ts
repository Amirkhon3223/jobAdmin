import {Component, ElementRef, Inject, Input, OnInit, Renderer2, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {VacancySettingsService} from "../../services/vacancy-settings.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {HotToastService} from "@ngneat/hot-toast";
import {FormBuilder} from "@angular/forms";
import {HttpClient} from "@angular/common/http";


@Component({
  selector: 'app-edit-vacancy',
  templateUrl: './edit-vacancy.component.html',
  styleUrls: ['./edit-vacancy.component.css']
})
export class EditVacancyComponent {
  @ViewChild('wysiwyg', { static: true }) wysiwyg!: ElementRef;

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
    private toast: HotToastService,

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

  ngAfterViewInit() {
    if (this.wysiwyg) {
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

  // Метод для добавления элемента в секцию списка если она есть
  // addItem(sectionIndex: number): void {
  //   const newListItem = 'Добавьте свой элемент';
  //   if (this.vacancy.sections[sectionIndex].type === 'list') {
  //     this.vacancy.sections[sectionIndex].items.push(newListItem);
  //   }
  // }
  //
  // removeItem(sectionIndex: number, itemIndex: number): void {
  //   if (this.vacancy.sections[sectionIndex].type === 'list') {
  //     this.vacancy.sections[sectionIndex].items.splice(itemIndex, 1);
  //   }
  // }
  //
  // trackByIndex(index: number, item: any): number {
  //   return index;
  // }

  updateVacancy(): void {
    const iframe = this.wysiwyg.nativeElement;
    const iframeDocument = iframe.contentDocument || iframe.contentWindow?.document;
    const newDescription = iframeDocument.body.innerHTML;
    this.vacancy.description = newDescription;

    // Далее, отправьте обновленное описание на сервер с помощью вашего сервиса
    this.vacancyService.updateVacancy(this.vacancy).subscribe(() => {
      // После успешного обновления, перенаправьтесь на страницу списка вакансий
      this.router.navigate(['/admin/dashboard']);
    });

    this.toast.success('Вакансия обновлена');
    this.closeModal();
  }

}
