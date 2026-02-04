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
import { MatButton, MatButtonModule } from '@angular/material/button';
import { NgIf, NgForOf } from '@angular/common';
import { MOCK_FORMDATA, Mock_table_data } from '../mock-data';
import { MatSelect, MatOption } from '@angular/material/select';
import { MatCard } from '@angular/material/card';
import { fORMTYPES, noSpaceError } from '../constant';
import { MatIcon } from '@angular/material/icon';

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
  ],
  templateUrl: './payroll.component.html',
  styleUrl: './payroll.component.scss',
})
export class PayrollComponent implements OnInit {
  constructor(private readonly formBuilder: FormBuilder) {}

  ngOnInit() {
    this.buildForm();
  }

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
}
