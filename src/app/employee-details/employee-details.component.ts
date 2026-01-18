import {
  AfterViewInit,
  OnInit,
  ViewChild,
  Component,
  effect,
} from '@angular/core';
import { MatCard, MatCardContent } from '@angular/material/card';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSort, MatSortHeader, MatSortModule } from '@angular/material/sort';
import { CommonModule } from '@angular/common';
import {
  MatPaginator,
  MatPaginatorModule,
  PageEvent,
} from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { ColumnMapping } from '../models/columnToDataMapping';
import { EmsServiceService } from '../services/ems-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { PATH_ADD_EMPLOYEE, PATH_EDIT_EMPLOYEE } from '../app.routes';
import { MatDialog } from '@angular/material/dialog';
import { DeleteEmployeeDialogComponent } from './delete-employee-dialog/delete-employee-dialog.component';
import {
  catchError,
  debounce,
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
  merge,
  startWith,
  Subject,
  switchMap,
} from 'rxjs';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { TableComponent } from "../shared/components/table/table.component";
import { BASIC_MOCK } from '../mock-data';
import { Employee } from '../models/Employee';

@Component({
  selector: 'app-employee-details',
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
    MatSortHeader,
    MatSortModule,
],
  templateUrl: './employee-details.component.html',
  styleUrl: './employee-details.component.scss',
})
export class EmployeeDetailsComponent implements OnInit, AfterViewInit {
  constructor(
    private readonly emsService: EmsServiceService,
    private readonly snackBar: MatSnackBar,
    private readonly router: Router,
    private readonly dialog: MatDialog
  ) {
    effect(() => {
      this.dataSource.data = this.emsService.employeeDataCache();
    });
  }

  mockData = BASIC_MOCK

  dataSource = new MatTableDataSource<any>([]);

  isSpin: boolean = false;

  private readonly searchSubject = new Subject<string>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit() {
    this.setupSearchDebounce();
    this.filteringValues();
    this.emsService.getEmployees();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.dataSource.sortingDataAccessor = (item, property) => {
      const value = item[property];
      return value ? value.toString().toLowerCase() : '';
    };
  }

  get isLoading() {
    return this.emsService.isLoading();
  }
  
  //need to add emp ID
  columnsToDataMapping: ColumnMapping = {
    Id: 'id',
    'First Name': 'name',
    Working: 'currentlyWorking',
    'E-mail': 'email',
    Salary: 'salary',
  };

  columnsToDisplay = Object.keys(this.columnsToDataMapping);

  columnsToDisplayWithAction = [
    ...this.columnsToDisplay,
    'editDetails',
    'action',
  ];

  clickOnEditDetails(id: string) {
    console.log('edit');
    console.log(id);
    this.router.navigate([`${PATH_EDIT_EMPLOYEE}/${id}`]);
  }

  isEmployeeEligible(emp: any) {
    if (emp.currentlyWorking === 'no') {
      return true;
    }
    return false;
  }

  path = PATH_ADD_EMPLOYEE;

  redirectTo() {
    this.router.navigate([this.path]);
  }

  clickOnDeleteDetails(element: any) {
    const dialogRef = this.dialog.open(DeleteEmployeeDialogComponent, {
      data: { name: element.name },
      height: '170px',
      width: '700px',
    });

    dialogRef.afterClosed().subscribe((res) => {
      const empId = element.eid;

      if (res && this.isEmployeeEligible(element)) {
        // Remove from table immediately (optimistic UI)
        const currentData = this.dataSource.data;
        this.dataSource.data = currentData.filter((e) => e.eid !== empId);

        // Show Snackbar with Undo
        const snackBarRef = this.snackBar.open('Deleted Successfully', 'Undo', {
          duration: 5000,
        });
        // Schedule API call after 5 seconds
        const timeoutId = setTimeout(() => {
          this.emsService.deleteEmployeeById(empId).subscribe({
            next: () => {
              this.snackBar.open('Employee deleted from server', 'Close', {
                duration: 3000,
              });
            },
            error: (err) => {
              const errMsg = err.error?.error || 'Something went wrong!';
              this.snackBar.open(errMsg, 'Close', { duration: 3000 });
            },
          });
        }, 5000);

        // If Undo clicked
        snackBarRef.onAction().subscribe(() => {
          clearTimeout(timeoutId); // Cancel API call
          const updatedData = [...this.dataSource.data, element];
          this.dataSource.data = updatedData;
          console.log('data is updated');
        });
      } else {
        this.snackBar.open('Employee is currently working', 'Close', {
          duration: 3000,
        });
      }
    });
  }

  onSearch(event: KeyboardEvent) {
    const input = event.target as HTMLInputElement;
    const value = input.value;
    this.searchSubject.next(value);
    console.log(value);
  }

  setupSearchDebounce(): void {
    this.searchSubject
      .pipe(debounceTime(200), distinctUntilChanged())
      .subscribe((value) => {
        this.searchDetails(value);
      });
  }

  searchDetails(value: string) {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

  filteringValues() {
    const fieldsToFilter = ['id', 'name', 'email']; // Add more fields easily here
    this.dataSource.filterPredicate = (data, filter) => {
      const lowerFilter = filter.trim().toLowerCase();
      return fieldsToFilter.some((field) =>
        String(data[field]).toLowerCase().includes(lowerFilter)
      );
    };
  }

  searchInAll(value: string) {
    if (value.length >= this.emsService.searchLength) {
      this.emsService.searchEmployee(value).subscribe({
        next: (res) => {
          this.dataSource.data = res;
        },
        error: (err) => {
          console.log(err);
        },
      });
    } else {
      //this.getEmployees();
    }
  }
}
