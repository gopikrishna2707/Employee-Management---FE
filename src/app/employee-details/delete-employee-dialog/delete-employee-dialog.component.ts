import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from "@angular/material/card";
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';

export interface DialogData {
  name: string;
}

@Component({
  selector: 'app-delete-employee-dialog',
  standalone: true,
  imports: [MatCardModule, MatDialogModule, MatButtonModule],
  templateUrl: './delete-employee-dialog.component.html',
  styleUrl: './delete-employee-dialog.component.scss'
})
export class DeleteEmployeeDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<DeleteEmployeeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {}

  onAccept(){
    this.dialogRef.close(true);
  }
}
