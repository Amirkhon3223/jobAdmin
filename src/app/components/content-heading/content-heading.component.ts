import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-content-heading',
  template:
    `
      <h2 class="text-2xl font-semibold mt-10">{{ title }}</h2>
      <p class="mt-2 text-primary dark:text-dark_text text-lg">{{ describe }}</p>
    `
})

export class ContentHeadingComponent {
  @Input() title: string = '';
  @Input() describe: string = '';
}
