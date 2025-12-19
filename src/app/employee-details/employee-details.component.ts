import { AfterViewInit, OnInit, ViewChild, Component } from '@angular/core';
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
  ) {}

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  @ViewChild(MatSort) sort!: MatSort;

  dataSource = new MatTableDataSource<any>([]);

  isSpin: boolean = false;

  private readonly searchSubject = new Subject<string>();

  pageIndex: number = 0;
  pageSize: number = 20;
  totalElements: any = 0;

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sortingDataAccessor = (item, property) => {
      const value = item[property];
      if (value === null || value === '' || value === undefined) {
        return this.sort.direction === 'asc' ? '\uffff' : '\u0000';
      }
      return value.toString().toLowerCase();
    };

    // merge(this.paginator.page)
    //   .pipe(
    //     startWith({ pageIndex: this.pageIndex, pageSize: this.pageSize }),
    //     switchMap((event: any) => {
    //       const page = event.pageIndex ?? this.pageIndex;
    //       const size = event.pageSize ?? this.pageSize;
    //       this.isSpin = true;
    //       return this.emsService.getEmployees(page, size); // or getEmployeesPaged
    //     }),
    //     map((res: any) => {
    //       this.isSpin = false;
    //       this.totalElements = res.totalElements;
    //       console.log(this.totalElements);
    //       this.pageIndex = res.number;
    //       this.pageSize = res.size;
    //       return res.content;
    //     }),
    //     catchError((err: any) => {
    //       this.isSpin = false;
    //       console.error(err);
    //       return [];
    //     })
    //   )
    //   .subscribe((data) => (this.dataSource.data = data));
  }

  ngOnInit() {
    this.setupSearchDebounce();
    this.filteringValues();
    this.getEmployees();
    this.printValues();
  }

  printValues() {
    const startsWithA: string[] = this.data.filter((a) => a.startsWith('a'));
    console.log(startsWithA);
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

  allData: any[] = [];

  // getEmployees(
  //   page: number,
  //   size: number,
  //   sortBy?: string,
  //   direction?: 'ASC' | 'DESC'
  // ) {
  //   this.isSpin = true;
  //   this.emsService.getEmployees(page, size, sortBy, direction).subscribe({
  //     next: (res) => {
  //       this.dataSource.data = res.content;
  //       this.allData = res.content;
  //       this.totalElements = res.totalElements;
  //       this.pageIndex = res.number;
  //       this.pageSize = res.size;
  //       this.isSpin = false;
  //     },
  //     error: (err) => {
  //       console.log('erros');
  //       this.isSpin = false;
  //     },
  //   });
  // }

  data: any[] = [
    'apple',
    'banana',
    'avocado',
    'mango',
    'grape',
    ['orange', 'kiwi'],
    'pineapple',
    'pear',
    'apricot',
    10,
    20,
    30,
  ];

  getEmployees() {
    this.isSpin = true;
    this.emsService.getEmployees().subscribe({
      next: (res) => {
        this.dataSource.data = res;
        this.allData = res.content;
        this.dataSource.paginator = this.paginator;
        this.isSpin = false;
      },
      error: (err) => {
        console.log('erros');
        this.isSpin = false;
      },
    });
  }

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
        this.searchInAll(value);
      });
  }

  searchDetails(value: string) {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

  filteringValues() {
    const fieldsToFilter = ['id', 'name', 'email', 'currentlyWorking']; // Add more fields easily here
    this.dataSource.filterPredicate = (data, filter) => {
      const lowerFilter = filter.trim().toLowerCase();
      return fieldsToFilter.some((field) =>
        String(data[field]).toLowerCase().includes(lowerFilter)
      );
    };
  }

  searchInAll(value: string) {
    if (value.length >= 3) {
      this.emsService.searchEmployee(value).subscribe({
        next: (res) => {
          this.dataSource.data = res;
        },
        error: (err) => {
          console.log(err);
        },
      });
    } else {
      this.getEmployees();
    }
  }

  onPageChange(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.getEmployees();
  }
}
