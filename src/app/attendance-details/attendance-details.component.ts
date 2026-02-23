import { Component, OnInit, ViewChild } from '@angular/core';
import { ColumnMapping } from '../models/columnToDataMapping';
import { MatTableDataSource } from '@angular/material/table';
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
    MatFormFieldModule,
    NormalTableComponent,
    ChildComponent
],
  templateUrl: './attendance-details.component.html',
  styleUrl: './attendance-details.component.scss',
})
export class AttendanceDetailsComponent implements OnInit {
  constructor(private readonly snackBar: MatSnackBar,
    private readonly emsService:EmsServiceService
  ) {
    this.ondebounce();
  }
  ngOnInit(): void {
    this.readValues();
    this.getData();
    this.exampleCd();
  }
  
  dataSource = new MatTableDataSource<any>(Mock_table_data);

  value: string = 'abc';

  searchText:string = '';

  columnsDataMapping: ColumnMapping = {
    name: 'name',
    salary: 'salary',
    department: 'department',
    email: 'email',
    contact: 'contact',
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
  readValues(){
    this.emsService.state1$.subscribe(val => {
      console.log(val);
    })

    this.emsService.state2$.subscribe(val => {
      console.log(val);
    })
  }

  user:any[] = [];
  userBasic:any[] = [];
  getData(){
    this.emsService.getAllemployeeDetails().subscribe({
      next:(res:any) => {
        console.log("fork join attendance");
        console.log(res);
        this.user = res.user;
        this.userBasic = res.userBasic;
        console.log(this.user);
        console.log(this.userBasic);

      },
      error:(err) => {
        console.log('error',err);
      }
    })
  }

  // formExample = new FormControl();

  // userForm!:FormGroup;

  // this.userForm = this.fb.group({
  //  ex1 : ['', ],
  //  ex2 : ['']
  // })

  exampleCd(){
    console.log('parent called');
  }

  //cd example
  cd = [{id:1},{id:2}];

  counter:number = 0
  increment(){
    this.counter++;
  }
  updateData(){
    //this.cd[0].id = 1;
    this.cd = [{...this.cd[0], id:3}, this.cd[1]]
  }
}

