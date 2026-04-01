import { Component, inject, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { NgIf, NgForOf, JsonPipe } from '@angular/common';
import { DataApi, MOCK_FORMDATA, Mock_table_data } from '../mock-data';
import { MatSelect, MatOption } from '@angular/material/select';
import { MatCard, MatCardContent } from '@angular/material/card';
import { fORMTYPES, noSpaceError } from '../constant';
import { MatIcon } from '@angular/material/icon';
import { HttpClient } from '@angular/common/http';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { EmsServiceService } from '../services/ems-service.service';
import { filter } from 'rxjs';

export interface tableData{
    employeeId: number,
    fullName: string,
    email: string,
    phone: string,
    gender: string,
    dateOfJoining: string,
    employeeType: string,
    salary: number,
    departmentName: string,
    designationName: string,
    isEditable : boolean
}

@Component({
  selector: 'app-payroll',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
  ],
  templateUrl: './payroll.component.html',
  styleUrl: './payroll.component.scss',
})
export class PayrollComponent{

  constructor(){this.printArray()}

  arr:any[] = [1,2,4,4,66,7,6,1];

 // newArr:any[] = [new Set(this.arr)];

  data:any[] = [{id:1,name:'gk'},{id:1,name:'sup'}];

  printArray(){
    const newArr = [...new Set(this.arr)];
    console.log(newArr);
    const newData = [... new Map(this.data.map(u => [u.id, u])).values()]
    console.log(newData);
    console.log([...this.data.reverse()]);
    const rev:any[] =[];
    for(let i = this.data.length - 1; i>=0 ;i--){
      rev.push(this.data[i]);
      console.log(this.data[i]);
    };
    console.log(rev);
    console.log(this.data.map(s => s.name.toLowerCase()).filter(s => s.startsWith('s')));
  };
}
