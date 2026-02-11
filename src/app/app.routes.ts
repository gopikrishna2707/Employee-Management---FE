import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { EmployeeDetailsComponent } from './employee-details/employee-details.component';
import { AddEmployeesDialogComponent } from './employee-details/add-employees-dialog/add-employees-dialog.component';
import { EditEmployeeComponent } from './employee-details/edit-employee/edit-employee.component';
import { AttendanceDetailsComponent } from './attendance-details/attendance-details.component';
import { Component } from '@angular/core';
import { PayrollComponent } from './payroll/payroll.component';
import { MastersComponent } from './masters/masters.component';

export const PATH_EMPLOYEE:string = 'api/employee';
export const PATH_ADD_EMPLOYEE:string = 'api/employee/action:add';
export const PATH_EDIT_EMPLOYEE:string = 'api/employee/action:edit';
export const PATH_EMPLOYEE_DETAILS:string = 'api/employee/details';
export const PATH_EMPLOYEE_ATTENDANCE:string = 'api/employee/attendance';
export const PATH_HOME:string = '';
export const PATH_PAYROLL:string = 'api/employee/payroll'
export const PATH_MASTERS:string = 'api/employee/masters'

export const routes: Routes = [

  { path: PATH_HOME,title:'Home', component: HomeComponent },
  { path: PATH_EMPLOYEE, component: EmployeeDetailsComponent },
  { path:PATH_ADD_EMPLOYEE, component:AddEmployeesDialogComponent},
  { path:`${PATH_EDIT_EMPLOYEE}/:eid`, component:AddEmployeesDialogComponent},
  { path: PATH_EMPLOYEE_DETAILS, component:EditEmployeeComponent},
  { path : PATH_EMPLOYEE_ATTENDANCE, component: AttendanceDetailsComponent},
  {path : PATH_PAYROLL, component: PayrollComponent},
  {path : PATH_MASTERS, component:MastersComponent},
  { path: '', redirectTo: PATH_HOME , pathMatch:'full'}
];
