import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { EmployeeDetailsComponent } from './employee-details/employee-details.component';
import { AddEmployeesDialogComponent } from './employee-details/add-employees-dialog/add-employees-dialog.component';
import { EditEmployeeComponent } from './employee-details/edit-employee/edit-employee.component';

export const PATH_EMPLOYEE:string = 'api/employee';
export const PATH_ADD_EMPLOYEE:string = 'api/employee/action:add';
export const PATH_EDIT_EMPLOYEE:string = 'api/employee/action:edit';
export const PATH_EMPLOYEE_DETAILS:string = 'api/employee/details';
export const PATH_HOME:string = '';

export const routes: Routes = [

  { path: PATH_HOME, component: HomeComponent },
  { path: PATH_EMPLOYEE, component: EmployeeDetailsComponent },
  { path:PATH_ADD_EMPLOYEE, component:AddEmployeesDialogComponent},
  { path:`${PATH_EDIT_EMPLOYEE}/:eid`, component:AddEmployeesDialogComponent},
  { path: PATH_EMPLOYEE_DETAILS, component:EditEmployeeComponent},
  { path: '**', redirectTo: PATH_HOME }
  
];
