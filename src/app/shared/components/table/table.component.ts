import {
  AfterViewInit,
  Component,
  effect,
  EventEmitter,
  input,
  OnInit,
  Output,
  ViewChild,
  viewChild,
} from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatCard, MatCardContent } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { Employee } from '../../../models/Employee';
import { MatSort, MatSortHeader, MatSortModule } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { PATH_ADD_EMPLOYEE } from '../../../app.routes';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ColumnMapping } from '../../../models/columnToDataMapping';
import { A11yModule } from "@angular/cdk/a11y";

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [
    MatCard,
    MatCardContent,
    CommonModule,
    MatTableModule,
    MatSortHeader,
    MatSortModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    A11yModule
],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent implements OnInit, AfterViewInit {

  data = input.required<Employee[]>();

  @Output() editClick = new EventEmitter<boolean>();

  @Output() deleteClick = new EventEmitter<boolean>();

  @ViewChild(MatSort) sort!: MatSort;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  // Columns derived from the first row’s keys

  columnsDataMapping:ColumnMapping = {
    Id: 'id',
    'First Name': 'name',
    Working: 'currentlyWorking',
    'E-mail': 'email',
    Salary: 'salary',
  };

  columnsToDisplay = Object.keys(this.columnsDataMapping);

  columnsToDisplayAction = [...this.columnsToDisplay, 'edit', 'delete'];

  excludeColumns:string[] = [];

  // Data source expects a list of rows (T[])
  dataSource = new MatTableDataSource<Employee>([]);

  constructor(private readonly router: Router) {}

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    const rows = this.data() ?? [];
    this.dataSource.data = rows;
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  redirectTo() {
    this.router.navigate([PATH_ADD_EMPLOYEE]);
  }

  onSearch($event: KeyboardEvent) {
   
  }
}
