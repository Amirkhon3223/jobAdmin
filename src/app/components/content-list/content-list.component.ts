import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-content-list',
  template:
    `
      <h1  class="text-2xl font-semibold mt-10">{{ title }}</h1>
      <ul class="list-disc pl-8">
        <li *ngFor="let describe of items" class="text-primary dark:text-dark_text mt-2 text-lg">{{ describe }}</li>
      </ul>
    `,
})
export class ContentListComponent {
  @Input() title: string = '';
  @Input() items: string[] = [];
}
