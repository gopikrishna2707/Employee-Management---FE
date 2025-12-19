import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, map, Observable } from 'rxjs';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class EmsServiceService {
  private static readonly BASE_URl = 'http://localhost:8099/api';

  constructor(
    private readonly http: HttpClient,
    private readonly snackBar: MatSnackBar
  ) {}

  // getEmployees(
  //   page = 0,
  //   size = 20,
  //   sortBy?: string,
  //   direction: 'ASC' | 'DESC' = 'ASC'
  // ): Observable<any> {
  //   let params = new HttpParams().set('page', page).set('size', size);

  //   if (sortBy) {
  //     params = params.set('sortBy', sortBy).set('direction', direction);
  //   }

  //   return this.http
  //     .get<any>(`${EmsServiceService.BASE_URl}/employees/basic`, { params })
  //     .pipe(
  //       delay(2000),
  //       map((res: any) => {
  //         return res;
  //       })
  //     );
  // }

  getEmployees(): Observable<any> {
    return this.http
      .get<any>(`${EmsServiceService.BASE_URl}/employees/basic`)
      .pipe(
        delay(2000),
        map((res: any) => {
          return res;
        })
      );
  }

  getEmployeesDetails(): Observable<any> {
    return this.http.get<any>(`${EmsServiceService.BASE_URl}/employees`).pipe(
      delay(2000),
      map((res: any) => {
        return res;
      })
    );
  }

  addEmployee(config: any): Observable<any> {
    return this.http
      .post<any>(`${EmsServiceService.BASE_URl}/employees`, config)
      .pipe(
        delay(2000),
        map((res: any) => {
          return res;
        })
      );
  }

  employeeById(empId: string): Observable<any> {
    return this.http
      .get<any>(`${EmsServiceService.BASE_URl}/employees/${empId}`)
      .pipe(
        delay(2000),
        map((res) => {
          return res;
        })
      );
  }

  updateEmployeeById(empId: string, payLoad: any): Observable<any> {
    return this.http
      .put<any>(`${EmsServiceService.BASE_URl}/employees/${empId}`, payLoad)
      .pipe(
        delay(1000),
        map((res) => {
          return res;
        })
      );
  }

  deleteEmployeeById(empId: string): Observable<any> {
    return this.http
      .delete<any>(`${EmsServiceService.BASE_URl}/employees/${empId}`)
      .pipe(
        delay(2000),
        map((res) => {
          return res;
        })
      );
  }

  searchEmployee(value:string):Observable<any>{
    return this.http
      .get<any>(`${EmsServiceService.BASE_URl}/employees/search/basic/${value}`).pipe(
        map((res:any) => {
          return res;
        })
      )
  }
}
