import {Component, ElementRef, Inject, Input, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {VacancySettingsService} from '../../services/vacancy-settings.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {HotToastService} from '@ngneat/hot-toast';

@Component({
  selector: 'app-edit-vacancy',
  templateUrl: './edit-vacancy.component.html',
  styleUrls: ['./edit-vacancy.component.css']
})
export class EditVacancyComponent {
  @ViewChild('wysiwyg', {static: true}) wysiwyg!: ElementRef;
  @Input() showModal = true;
  @Input() vacancy: any = {};

  closeAnimationActive = false;
  isLoading = true;
  vacancyId = 0;

  constructor(
    public dialogRef: MatDialogRef<EditVacancyComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private vacancyService: VacancySettingsService,
    private router: Router,
    private route: ActivatedRoute,
    private toast: HotToastService,
  ) {
    this.vacancyId = data.id;
  }

  closeModal(): void {
    this.showModal = false
  }

  async ngOnInit(): Promise<void> {
    try {
      this.isLoading = false;
    } catch (error) {
      console.error(error);
    }
    const vacancyId = this.data.id;
    try {
      this.vacancy = await this.vacancyService.getVacancyById(vacancyId);
    } catch (error) {
      console.error(error);
    }
  }

  ngAfterViewInit() {
    if (this.wysiwyg && this.wysiwyg.nativeElement) {
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

  async updateVacancy(): Promise<void> {
    const iframe = this.wysiwyg.nativeElement;
    const iframeDocument = iframe.contentDocument || iframe.contentWindow?.document;
    const newDescription = iframeDocument.body.innerHTML;
    this.vacancy.description = newDescription;

    try {
      await this.vacancyService.updateVacancy(this.vacancy);
      // После успешного обновления, идем короче на страницу списка вакансий
      this.router.navigate(['/admin/dashboard']);
      this.toast.success('Вакансия обновлена');
      this.dialogRef.close(); // Закрытие модального окна
    } catch (error) {
      throw (error);
    }
  }
}
