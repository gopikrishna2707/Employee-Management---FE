import { Component, OnInit, ViewChild } from '@angular/core';
import { ColumnMapping } from '../models/columnToDataMapping';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { TableComponent } from '../shared/components/table/table.component';
import { BASIC_ATTENDANCE, Mock_table_data } from '../mock-data';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SlicingPipe } from '../shared/pipes/slicingPipe';
import {
  MatFormField,
  MatFormFieldModule,
  MatLabel,
} from '@angular/material/form-field';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatInput, MatInputModule } from '@angular/material/input';
import { debounce, debounceTime, delay, filter, Subject } from 'rxjs';
import { EmployeeDetailsComponent } from '../employee-details/employee-details.component';
import { EmsServiceService } from '../services/ems-service.service';
import { NormalTableComponent } from '../shared/components/normal-table/normal-table.component';
import { ChildComponent } from './child/child.component';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { AuthService } from '../auth/auth.service';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { MatProgressSpinner, MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-attendance-details',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatTableModule,
    MatButton,
    MatButtonModule,
    MatIconModule,
    NgxSkeletonLoaderModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './attendance-details.component.html',
  styleUrl: './attendance-details.component.scss',
})
export class AttendanceDetailsComponent implements OnInit {
  constructor(
    private readonly emsService: EmsServiceService,
    readonly authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.getAttendaceDetailsById('s');
  }

  isLoading:boolean = false;

  isAdmin$ = this.authService.isAdmin$;

  attendanceData: any[] = [];

  totalWorkingDays: number = 0;

  currentWorkingDays: number = 0;

  dataSource = new MatTableDataSource<any[]>([]);

  columnsToDataMapping: ColumnMapping = {
    Date: 'date',
    'Punch-In': 'check_in',
    'Punch-Out': 'check_out',
    Hours: 'total_hours',
  };

  columnsToDisplay = Object.keys(this.columnsToDataMapping);

  getAttendaceDetailsById(id: string) {
    this.isLoading = true;
    this.emsService
      .getAttendanceById(id)
      .pipe(delay(2000))
      .subscribe({
        next: (res) => {
          this.dataSource = res.records;
          this.totalWorkingDays = res.total_working_days;
          this.currentWorkingDays = res.current_working_days;
          this.isLoading = false;
        },
        error: (err) => {
          console.log(err);
          this.isLoading = false;
        },
      });
  }
}
