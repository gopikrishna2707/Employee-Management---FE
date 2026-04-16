import { Component, Inject, OnInit } from '@angular/core';
import { Role } from '../models/Employee';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogModule,
} from '@angular/material/dialog';
import { MatChipListbox, MatChipsModule } from '@angular/material/chips';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from "@angular/material/card";
import { MatDividerModule } from "@angular/material/divider";
import { MatListModule } from "@angular/material/list";
import { MatIcon } from "@angular/material/icon";

export interface DialogData {
  id: number;
  uid: string;
  email:string
  username: string;
  roles: Role[];
  accountExpired: boolean;
  accountNonLocked: boolean;
  credentialsExpired: boolean;
  active: boolean;
}

@Component({
  selector: 'app-profile-dialog',
  standalone: true,
  imports: [MatDialogModule, MatChipsModule, CommonModule, MatButtonModule, MatCardModule, MatDividerModule, MatListModule, MatIcon],
  templateUrl: './profile-dialog.component.html',
  styleUrl: './profile-dialog.component.scss',
})
export class ProfileDialogComponent implements OnInit {
  profileData: DialogData;

  profileKeyValues: { label: string; value: any }[] = [];

  constructor(
    public dialogRef: MatDialogRef<ProfileDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data: DialogData,
  ) {
    this.profileData = data;
  }

  ngOnInit(): void {

  }

  onCancel() {
    this.dialogRef.close(false);
  }

  onSubmit() {
    this.dialogRef.close(true);
  }
}
