import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, signal, ViewChild } from '@angular/core';
import { BehaviorSubject, catchError, delay, forkJoin, map, Observable, of, shareReplay, Subject, tap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { environment } from '../../environments/environment.prod';
import { EmployeeDetailsComponent } from '../employee-details/employee-details.component';


@Injectable({
  providedIn: 'root',
})
export class EmsServiceService {

  private static readonly BASE_URL = environment.apiBaseUrl;

  searchLength:number = 3;

  @ViewChild(EmployeeDetailsComponent) employeeComponent!:EmployeeDetailsComponent;

  constructor(
    private readonly http: HttpClient,
    private readonly snackBar: MatSnackBar
  ) { }

  employeeDataCache = signal<any[]>([]);

  state1$ = new Subject();
  
  state2$ = new BehaviorSubject<any>('');

  isLoading = signal(false);


  getEmployees(): Observable<any> {
    return this.http.get<any>(`${EmsServiceService.BASE_URL}/employees/basic`).pipe(
      map((res: any) => {
        return res;
      })
    )
  }

  getEmployeesDetails(): Observable<any> {
    return this.http.get<any>(`${EmsServiceService.BASE_URL}/employees`).pipe(
      delay(2000),
      map((res: any) => {
        return res;
      })
    );
  }

  getAllemployeeDetails(): Observable<any>{
   console.log('called fork')
   return forkJoin({
      user: this.http.get(`${EmsServiceService.BASE_URL}/employees`).pipe(catchError(
        (err) => {
          return of([])
        }
      )),
      userBasic : this.http.get(`${EmsServiceService.BASE_URL}/employees/basic`).pipe(
        catchError(err => {
          return of([])
        })
      )
    }).pipe(
      map((res:any) => {
        return res;
      })
    )
  }

  addEmployee(config: any): Observable<any> {
    return this.http
      .post<any>(`${EmsServiceService.BASE_URL}/employees`, config)
      .pipe(
        delay(2000),
        tap((res: any) => {
          this.employeeDataCache.set([]);
          return res;
        })
      );
  }

  employeeById(empId: string): Observable<any> {
    return this.http
      .get<any>(`${EmsServiceService.BASE_URL}/employees/${empId}`)
      .pipe(
        delay(2000),
        map((res) => {
          return res;
        })
      );
  }

  //example for cached  data
  private employeeByIdcache$ = new Map<string, Observable<any>>();

  getemployeeById(id:string){
    if(!this.employeeByIdcache$.has(id)){
      const request$ = this.http.get(`${EmsServiceService.BASE_URL}/employees/${id}`).pipe(
        shareReplay(1)
      )
      this.employeeByIdcache$.set(id, request$);
    }
    return this.employeeByIdcache$.get(id);
  }

  updateEmployeeById(empId: string, payLoad: any): Observable<any> {
    return this.http
      .put<any>(`${EmsServiceService.BASE_URL}/employees/${empId}`, payLoad)
      .pipe(
        delay(1000),
        map((res) => {
          this.employeeDataCache.set([]);
          return res;
        })
      );
  }

  deleteEmployeeById(empId: string): Observable<any> {
    return this.http
      .delete<any>(`${EmsServiceService.BASE_URL}/employees/${empId}`)
      .pipe(
        delay(2000),
        map((res) => {
          this.employeeDataCache.set([]);
          return res;
        })
      );
  }

  searchEmployee(value: string): Observable<any> {
    return this.http
      .get<any>(`${EmsServiceService.BASE_URL}/employees/search/basic/${value}`).pipe(
        map((res: any) => {
          return res;
        })
      )
  }

  viewing(){
    console.log("view child");
  }
}
