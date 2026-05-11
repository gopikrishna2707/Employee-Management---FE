import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { EmployeeDetailsComponent } from './employee-details/employee-details.component';
import { AddEmployeesDialogComponent } from './employee-details/add-employees-dialog/add-employees-dialog.component';
import { AttendanceDetailsComponent } from './attendance-details/attendance-details.component';
import { PayrollComponent } from './payroll/payroll.component';
import { MastersComponent } from './masters/masters.component';
import { LoginPageComponent } from './auth/login-page/login-page.component';
import { authInterceptor } from './auth/interceptor';
import { authGuard } from './auth/authGuard';
import { RolesComponent } from './auth/roles/roles.component';
import { ProfileDialogComponent } from './profile-dialog/profile-dialog.component';


export const BASIC_PATH: string = 'v1/api';

export const PATH_LOGIN: string = `${BASIC_PATH}/login`;
export const PATH_EMPLOYEE: string = `${BASIC_PATH}/employee`;
export const PATH_ADD_EMPLOYEE: string = `${BASIC_PATH}/employee/add`;
export const PATH_EDIT_EMPLOYEE: string = `${BASIC_PATH}/employee/:eid/edit`;
//export const PATH_EMPLOYEE_DETAILS: string = `${BASIC_PATH}/employee/details`;
export const PATH_EMPLOYEE_ATTENDANCE: string = `${BASIC_PATH}/employee/attendance`;
export const PATH_HOME: string = `${BASIC_PATH}/Home`;
export const PATH_PAYROLL: string = `${BASIC_PATH}/employee/payroll`;
export const PATH_MASTERS: string = `${BASIC_PATH}/employee/masters`;
export const PATH_ROLES: string = `${BASIC_PATH}/employee/roles`;
export const PATH_SETTINGS:string = `${BASIC_PATH}/settings`
export const PATH_PROFILE:string = `${BASIC_PATH}/profile/:uid`

export const routes: Routes = [
  { path: '', redirectTo: PATH_LOGIN, pathMatch: 'full' },
  {
    path: PATH_LOGIN,
    component: LoginPageComponent,
  },
  {
    path: PATH_HOME,
    title: 'Home',
    loadComponent: () =>
      import('./home/home.component').then((m) => m.HomeComponent),
    canActivate: [authGuard],
  },
  {
    path: `${PATH_EMPLOYEE}`,
    title: 'Employee',
    component: EmployeeDetailsComponent,
    canActivate: [authGuard],
  },
  {
    path: PATH_ADD_EMPLOYEE,
    component: AddEmployeesDialogComponent,
    canActivate: [authGuard],
  },
  {
    path: PATH_EDIT_EMPLOYEE,
    component: AddEmployeesDialogComponent,
    canActivate: [authGuard],
  },
  {
    path: PATH_EMPLOYEE_ATTENDANCE,
    component: AttendanceDetailsComponent,
    canActivate: [authGuard],
  },
  {
    path: PATH_PAYROLL,
    component: PayrollComponent,
    canActivate: [authGuard],
  },
  {
    path: PATH_MASTERS,
    component: MastersComponent,
    canActivate: [authGuard],
  },
  {
    path: PATH_ROLES,
    component: RolesComponent,
    canActivate: [authGuard],
  },
  {
    path: PATH_PROFILE,
    component: ProfileDialogComponent,
    canActivate:[authGuard]
  },
  {
    path: '**',
    redirectTo: PATH_HOME,
  }, //wildcard route
];
