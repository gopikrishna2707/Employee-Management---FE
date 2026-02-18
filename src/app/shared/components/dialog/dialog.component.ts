import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef, MatDialogTitle, MatDialogContent, MatDialogActions } from '@angular/material/dialog';
import { MatButton } from "@angular/material/button";

export interface DialogData{
  title:string,
  subTitle:string,
  projectId:string,
  submitButton:string,
  cancelButton:string
}

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [ MatDialogTitle, MatDialogContent, MatDialogActions, MatButton],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss'
})
export class DialogComponent {

  title:string;
  subTitle:string;
  projectId:string
  submitbutton:string;
  cancelButon:string;

  constructor(
    public dialogRef:MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) data:DialogData
  ){

    this.title = data.title;
    this.subTitle = data.subTitle;
    this.projectId = data.projectId
    this.submitbutton = data.submitButton;
    this.cancelButon = data.cancelButton;
  }

  onCancel(){
    this.dialogRef.close(false);
    console.log(this.projectId);
  }
  onSubmit(){
    this.dialogRef.close(true);
  }
}
