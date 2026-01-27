import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButton, MatButtonModule } from "@angular/material/button";
import { NgIf, NgForOf } from '@angular/common';
import { MOCK_FORMDATA, Mock_table_data } from '../mock-data';
import { MatSelect, MatOption } from "@angular/material/select";
import { MatCard } from "@angular/material/card";
import { fORMTYPES } from '../constant';

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
    MatOption
],
  templateUrl: './payroll.component.html',
  styleUrl: './payroll.component.scss'
})
export class PayrollComponent implements OnInit {

  constructor(
    private readonly formBuilder:FormBuilder
  ){}

  ngOnInit(){
     this.initializeForm();
    this.buildForm();
  }

  userForm!:FormGroup;

  isEdit:boolean = false;

  initializeForm(){
    this.userForm = this.formBuilder.group({});
  }

  onSubmit() {
     console.log(this.userForm.getRawValue());
     console.log(this.userForm.value);
  }

  data = MOCK_FORMDATA;

  buildForm(){
    debugger
    const f = Object.keys(this.data);
    const keysNeed = ['name', 'password', 'state'];
    const addFields:any = {};
    keysNeed.forEach((key) => {
      if(this.data.hasOwnProperty(key)){
        addFields[key] =  this.formBuilder.control(this.data[key] ?? '', [Validators.required]);
      }
    })
    this.userForm = this.formBuilder.group(addFields);
  }

  getType(key:string){
    debugger
     const feilds = fORMTYPES;
     return feilds[key.toLowerCase()].type;
  }

  getInputType(key:string){
    debugger
    const field = fORMTYPES;
    return field[key.toLowerCase()].input_type;
  }
}
