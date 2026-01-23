import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router } from '@angular/router';
import { PATH_ADD_EMPLOYEE, PATH_EMPLOYEE, PATH_EMPLOYEE_ATTENDANCE, PATH_HOME, PATH_PAYROLL } from '../app.routes';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    MatCardModule,
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatTabsModule,
    MatMenuModule,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  constructor(private readonly router: Router) {}

  dashBoard: any[] = [
    { label: 'Dashboard', path: PATH_HOME },
    { label: 'Employees', path: PATH_EMPLOYEE },
    { label: 'Attendance', path: PATH_EMPLOYEE_ATTENDANCE },
    { label: 'Payroll', path: PATH_PAYROLL },
    { label: 'Masters', path: '' },
    { label: 'Settings', path:''  },
  ];

  
  navClick(item: any) {
    this.router.navigate([item.path]);
  }

  onAddEmployee() {
    console.log('clicked');
    this.router.navigate([PATH_ADD_EMPLOYEE]);
  }
}
