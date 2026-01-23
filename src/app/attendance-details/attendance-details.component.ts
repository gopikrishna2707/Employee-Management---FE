import { Component, ViewChild } from '@angular/core';
import { ColumnMapping } from '../models/columnToDataMapping';
import { MatTableDataSource } from '@angular/material/table';
import { TableComponent } from '../shared/components/table/table.component';
import { BASIC_ATTENDANCE } from '../mock-data';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SlicingPipe } from '../shared/pipes/slicingPipe';
import { MatFormField, MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatInput, MatInputModule } from "@angular/material/input";
import { debounce, debounceTime, filter, Subject } from 'rxjs';
import { EmployeeDetailsComponent } from '../employee-details/employee-details.component';
import { EmsServiceService } from '../services/ems-service.service';

@Component({
  selector: 'app-attendance-details',
  standalone: true,
  imports: [
    CommonModule,
    TableComponent,
    MatCardModule,
    SlicingPipe,
    MatFormField,
    MatLabel,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule
],
  templateUrl: './attendance-details.component.html',
  styleUrl: './attendance-details.component.scss',
})
export class AttendanceDetailsComponent {
  constructor(private readonly snackBar: MatSnackBar,
    private readonly emsService:EmsServiceService
  ) {
    this.ondebounce();
  }
  
  dataSource = new MatTableDataSource<any>(BASIC_ATTENDANCE);

  value: string = 'abc';

  searchText:string = '';

  columnsDataMapping: ColumnMapping = {
    ID: 'id',
    'Time-In': 'clock_in',
    'Time-Out': 'clock_out',
    Today: 'today_in',
  };

  columnsToDisplay = Object.keys(this.columnsDataMapping);

  handleEditEvent(editEvent: any) {
    console.log(editEvent.id);
    this.snackBar.open('edit clicked', 'close', { duration: 3000 });
    this.emsService.viewing();
  }
  
  handleDeleteEvent(deleteEvent: any) {
    console.log(deleteEvent);
    this.snackBar.open('delete clicked', 'close', { duration: 3000 });
  }

  private readonly searchTextSubject = new Subject<string>();

  ondebounce(){
    this.searchTextSubject
     .pipe(debounceTime(500), filter(v => v.length >= 3)).subscribe((value) => {
      this.calApi(value);
     })
  }

  calApi(value:string){
    console.log(value);
  }
  
  handleSearch(event : Event){
    const input = event.target as HTMLInputElement;
    const value = input.value;
    this.searchTextSubject.next(value);
  }
}
