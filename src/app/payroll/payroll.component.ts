import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { NgIf, NgForOf } from '@angular/common';
import { MOCK_FORMDATA, Mock_table_data } from '../mock-data';
import { MatSelect, MatOption } from '@angular/material/select';
import { MatCard, MatCardContent } from '@angular/material/card';
import { fORMTYPES, noSpaceError } from '../constant';
import { MatIcon } from '@angular/material/icon';
import { HttpClient } from '@angular/common/http';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { EmsServiceService } from '../services/ems-service.service';

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
    MatTableModule
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
    id: 'id',
    Name: 'username',
    'E-mail': 'email',
    WebSite: 'website'
  }

  dataSource = new MatTableDataSource<any>([]);

  columnsToDisplay = Object.keys(this.columsToDataMapping);

  columnsToDisplayWithAction = [...this.columnsToDisplay, 'edit', 'cancel', 'delete'];

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

  tableData: any[] = [];

  //practice for editable rows
  loadData() {
    this.http.get('https://jsonplaceholder.typicode.com/users').subscribe({
      next: (res: any) => {
        this.dataSource.data = res;
      },
      error: (err) => {
        console.log('err', err);
      }
    })
  }

  onAddNewRow() {
    const newRow: any = {
      id: null,           
      name: '',
      email: '',
      isEditable: true,
      isNew: true
    };

    this.dataSource.data = [
      newRow,
      ...this.dataSource.data.map(r => ({ ...r, isEditable: false }))
    ];
  }

  originalRowMap: any = {};

  onEditClick(element: any) {
    console.log(element.id);
    this.originalRowMap[element.id] ??= { ...element };
    this.dataSource.data = this.dataSource.data.map(rows => ({
      ...rows,
      isEditable: rows.id == element.id
    }))
  }

  onCancelClick(row: any) {
    const o = this.originalRowMap[row.id];
    if (!o) return;
    this.dataSource.data = this.dataSource.data.map(r =>
      r.id === row.id ? { ...o, isEditable: false } : { ...r, isEditable: false }
    );
    delete this.originalRowMap[row.id];
  }

  selected(event:any){
    debugger
    const value = event;
    console.log('dropdown changed');
    this.ser.state1$.next(value);
    this.ser.state2$.next(value);
  }
}
