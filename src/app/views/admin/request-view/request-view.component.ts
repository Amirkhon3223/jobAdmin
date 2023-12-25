import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-request-view',
  templateUrl: './request-view.component.html',
  styleUrls: ['./request-view.component.css']
})
export class RequestViewComponent implements OnInit{
  constructor(
    @Inject(MAT_DIALOG_DATA) public applicationDetails: any,
    public dialogRef: MatDialogRef<RequestViewComponent>
  ) {}

  closeModal() {
    this.dialogRef.close();
  }

  ngOnInit(): void {
  }
}
