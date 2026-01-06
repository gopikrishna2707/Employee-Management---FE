import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatCard, MatCardContent } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { Employee } from '../../../models/Employee';
import { MatSort, MatSortHeader, MatSortModule } from '@angular/material/sort';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { PATH_ADD_EMPLOYEE } from '../../../app.routes';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ColumnMapping } from '../../../models/columnToDataMapping';
import { A11yModule } from '@angular/cdk/a11y';

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
    MatPaginatorModule,
  ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent implements OnInit, AfterViewInit {
  data = input.required<Employee[]>();

  @Input({ required: true }) columnsToDisplay: any[] = [];

  @Input({ required: true }) mapping: Record<string, string> = {};

  @Output() editClick = new EventEmitter<any>();

  @Output() deleteClick = new EventEmitter<any>();

  @ViewChild(MatSort) sort!: MatSort;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  get columnsToDisplayAction() {
    return [...this.columnsToDisplay, 'edit', 'delete'];
  }

  excludeColumns: string[] = [];

  // Data source expects a list of rows (T[])
  dataSource = new MatTableDataSource<Employee>([]);

  constructor(private readonly router: Router) {}

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    const rows = this.data() ?? [];
    this.dataSource.data = rows;
  }

  redirectTo() {
    this.router.navigate([PATH_ADD_EMPLOYEE]);
  }

  onDeleteClick(element:any) {
     this.editClick.emit(element);
  }

  onEditClick(element:any) {
    this.deleteClick.emit(element);
  }

  onSearch($event: KeyboardEvent) {}
}
