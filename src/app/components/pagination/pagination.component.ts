import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})

export class PaginationComponent {
  @Input() currentPage: any;
  @Input() totalPages: any;

  @Output() pageChanged = new EventEmitter<number>();

  onPageClick(pageNumber: number): void {
    console.log(`Clicked on page ${pageNumber}`);
    this.pageChanged.emit(pageNumber);
  }

  getPages(): number[] {
    const pagesArray: number[] = [];

    // Добавляем страницы в массив до общего количества страниц
    for (let i = 1; i <= this.totalPages; i++) {
      pagesArray.push(i);
    }
    return pagesArray;
  }
}
