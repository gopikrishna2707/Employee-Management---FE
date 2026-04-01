import { Component, OnInit, ViewChild } from '@angular/core';
import { ColumnMapping } from '../models/columnToDataMapping';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { TableComponent } from '../shared/components/table/table.component';
import { BASIC_ATTENDANCE, Mock_table_data } from '../mock-data';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SlicingPipe } from '../shared/pipes/slicingPipe';
import { MatFormField, MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatInput, MatInputModule } from "@angular/material/input";
import { debounce, debounceTime, filter, Subject } from 'rxjs';
import { EmployeeDetailsComponent } from '../employee-details/employee-details.component';
import { EmsServiceService } from '../services/ems-service.service';
import { NormalTableComponent } from "../shared/components/normal-table/normal-table.component";
import { ChildComponent } from "./child/child.component";
import { MatButton, MatButtonModule } from "@angular/material/button";
import { MatIcon, MatIconModule } from "@angular/material/icon";

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
    MatIconModule
],
  templateUrl: './attendance-details.component.html',
  styleUrl: './attendance-details.component.scss',
})
export class AttendanceDetailsComponent implements OnInit{

  constructor(
    private readonly emsService:EmsServiceService
  ){}

  ngOnInit(): void {
    this.getAttendaceDetailsById('s');
  }
  attendanceData:any[] = [];

  totalWorkingDays:number = 0;

  currentWorkingDays:number = 0;

  dataSource = new MatTableDataSource<any[]>([]);

  columnsToDataMapping:ColumnMapping = {
    Date:'date',
    'Punch-In':'check_in',
    'Punch-Out':'check_out',
    Hours:'total_hours',
  };

  columnsToDisplay = Object.keys(this.columnsToDataMapping);

  getAttendaceDetailsById(id:string){
    this.emsService.getAttendanceById(id).subscribe({
      next:(res) => {
        this.dataSource = res.records;
        this.totalWorkingDays =res.total_working_days;
        this.currentWorkingDays = res.current_working_days;
      },
      error:(err) => {
        console.log(err);
      }
    })
  }
}