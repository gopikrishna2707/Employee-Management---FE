import { Component, OnInit } from '@angular/core';
import {
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
import { MOCK_FORMDATA, Mock_table_data } from '../mock-data';
import { MatSelect, MatOption } from '@angular/material/select';
import { MatCard, MatCardContent } from '@angular/material/card';
import { fORMTYPES, noSpaceError } from '../constant';
import { MatIcon } from '@angular/material/icon';
import { HttpClient } from '@angular/common/http';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { EmsServiceService } from '../services/ems-service.service';

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
    NgIf,
    NgForOf,
    MatSelect,
    MatCard,
    MatOption,
    MatIcon,
    MatCardContent,
    MatTableModule,
  ],
  templateUrl: './payroll.component.html',
  styleUrl: './payroll.component.scss',
})
export class PayrollComponent implements OnInit {
  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly http: HttpClient,
    private readonly ser:EmsServiceService
  ) { }

  ngOnInit() {
    this.buildForm();
    this.loadData();
  }

  columsToDataMapping: any = {
    id: 'employeeId',
    Name: 'fullName',
    'E-mail': 'email',
    WebSite: 'website',
  };
  
  dataSource = new MatTableDataSource<any>([]);

  columnsToDisplay = Object.keys(this.columsToDataMapping);

  columnsToDisplayWithAction = [
    ...this.columnsToDisplay,
    'edit',
    'cancel',
    'delete',
  ];

  userForm!: FormGroup;

  isEdit: boolean = false;

  onSubmit() {
    console.log(this.userForm.getRawValue());
    console.log(this.userForm.value);
  }

  data = MOCK_FORMDATA;

  buildForm() {
    const keysNeed = ['name', 'password', 'state'];
    const addFields: any = {};
    keysNeed.forEach((key) => {
      if (this.data.hasOwnProperty(key)) {
        addFields[key] = this.formBuilder.control(this.data[key] ?? '', [
          Validators.required,
        ]);
      }
    });

    if (this.data.hasOwnProperty('newValue')) {
      addFields['newvalue'] = this.formBuilder.control('', [
        Validators.required,
        noSpaceError,
      ]);
    }

    this.userForm = this.formBuilder.group(addFields);
  }

  getType(key: string) {
    const feilds = fORMTYPES;
    return feilds[key.toLowerCase()].type;
  }

  getInputType(key: string) {
    const field = fORMTYPES;
    return field[key.toLowerCase()].input_type;
  }

  get dataKeys() {
    return Object.keys(this.data);
  }

  tableData: tableData[] = [];

  //practice for editable rows
   like: string = 'https://api.freeprojectapi.com/api/EmployeeApp/GetEmployees'
  loadData() {
    this.http.get(this.like).subscribe({
      next: (res: any) => {
        this.tableData = res;
        console.log(this.tableData);
      },
      error: (err) => {
        console.log('err', err);
      },
      complete:() => {
        console.log("success");
      }
    });
  }


  oldObj:any = {};

  onEditClick(element:tableData){
    if(!this.oldObj[element.employeeId]){
      this.oldObj[element.employeeId] = structuredClone(element);
    }
    element.isEditable = true;
    console.log(this.oldObj);
    //for ony one line at a time
    // element.isEditable = true;
    // console.log(this.tableData);
    // this.oldObj = structuredClone(element);
    //for full table ediable
    //this.isEditable = true;
  }

  handleDeleteRow(event:any){
    if(event){
      this.dataSource.data = this.dataSource.data.filter((r) => r.isNew != true)
    }
  }

  originalData: any = [];

  onCancelClick(element:tableData){
    Object.assign(element, this.oldObj[element.employeeId]);
    element.isEditable = false;
    // element.isEditable = false;
    // element.employeeId = this.oldObj.employeeId;
    // element.email = this.oldObj.email;
    // element.fullName = this.oldObj.fullName;
    // element.departmentName = this.oldObj.departmentName;
    //for full table
    //this.isEdiable = false;
  }

  selected(event:any){
    const value = event;
    console.log('dropdown changed');
    this.ser.state1$.next(value);
    this.ser.state2$.next(value);
  }
}
