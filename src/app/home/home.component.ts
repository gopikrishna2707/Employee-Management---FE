import { CommonModule, NgForOf } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCard, MatCardModule } from "@angular/material/card";
import { PATH_ADD_EMPLOYEE, PATH_EMPLOYEE } from '../app.routes';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatCard, MatCardModule, MatButtonModule, NgForOf, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  constructor(private readonly router:Router){}

  homeButtonList:any[] = [
    { name: 'Create Employee', path: PATH_ADD_EMPLOYEE},
    { name:'All employees', path: PATH_EMPLOYEE },
    // { name:'Employee Details', path: PATH_EMPLOYEE_DETAILS}
  ];

  arr: any[] = ['apld', 'bbws', 'djbsb','sffe'];
  redirectTo(path:any) {
    this.router.navigate([path]);
    this.arr.forEach((a) => {
      console.log(a.length);
    })

  }
}
