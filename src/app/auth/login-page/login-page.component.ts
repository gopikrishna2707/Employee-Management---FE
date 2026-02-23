import { Component, OnInit } from '@angular/core';
import { MatFormField, MatFormFieldModule, MatLabel } from "@angular/material/form-field";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButton } from "@angular/material/button";
import { EmsServiceService } from '../../services/ems-service.service';
import { Route, Router } from '@angular/router';
import { PATH_EMPLOYEE, PATH_HOME } from '../../app.routes';

export interface loginObj{
    EmailId:string,
    Password:string
  }

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [
    MatFormField,
    MatLabel,
    FormsModule,
    ReactiveFormsModule,
    CommonModule, MatFormFieldModule, MatInputModule,
    MatButton
],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss'
})
export class LoginPageComponent implements OnInit {

  constructor(
    private readonly fb: FormBuilder,
    private readonly emsSer:EmsServiceService,
    private readonly router:Router
  ) { }

  ngOnInit(): void {
    this.formInitialize();
  }
  loginForm!: FormGroup;

  formInitialize() {
    this.loginForm = this.fb.group({
      username: ['', Validators.email],
      password: ['', Validators.required]
    })
  }

  userDetails:any = {};

  onSubmit(){
    
    const formData = this.loginForm.getRawValue();
    console.log(formData);
    this.emsSer.userWithToken(formData).subscribe({
      next:(res) => {
        this.userDetails = res;
        this.router.navigate([PATH_HOME]);
        console.log(this.userDetails);
      },
      error:(err) => {
        console.log(err.error.message);
      }
    })
  }
}
