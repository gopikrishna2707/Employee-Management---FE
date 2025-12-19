import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCard, MatCardContent, MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { EmsServiceService } from '../../services/ems-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-employee',
  standalone: true,
  imports: [
    MatCard,
    MatCardContent,
    MatTableModule,
    CommonModule,
    MatPaginatorModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    FormsModule,
    MatSelectModule,
    MatInputModule,
    MatSortModule,
    MatCardModule,
  ],
  templateUrl: './edit-employee.component.html',
  styleUrl: './edit-employee.component.scss',
})
export class EditEmployeeComponent {
  constructor(
    private readonly emsService: EmsServiceService,
    private readonly snackBar: MatSnackBar
  ) {}

  employeeDetails: any[] = [];

  isSpin: boolean = false;

  employeeEid: string = '';

  getEmployeeById() {
    this.isSpin = true;
    this.emsService.employeeById(this.employeeEid).subscribe({
      next: (res) => {
        this.employeeDetails = res;
        this.isSpin = false;
      },
      error: (err) => {
        const errMsg = err.error?.error || 'Something went wrong!';
        this.isSpin = false;
        this.snackBar.open(errMsg, 'Close', { duration: 3000 });
      },
    });
  }
}
