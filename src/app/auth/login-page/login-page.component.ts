import { Component, OnInit } from '@angular/core';
import { MatFormField, MatFormFieldModule, MatLabel } from "@angular/material/form-field";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButton } from "@angular/material/button";
import { EmsServiceService } from '../../services/ems-service.service';
import { Route, Router } from '@angular/router';
import { PATH_EMPLOYEE, PATH_HOME } from '../../app.routes';
import { MatSelect, MatOption } from "@angular/material/select";
import { MatCard } from "@angular/material/card";
import { Role } from '../../models/Employee';
import { AuthService } from '../auth.service';
import { LoginResponse } from '../../models/LoginResponse';
import { MatSnackBar } from '@angular/material/snack-bar';

export interface loginObj{
    username:string,
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
    MatButton,
    MatSelect,
    MatOption,
    MatCard
],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss'
})
export class LoginPageComponent implements OnInit {

  constructor(
    private readonly fb: FormBuilder,
    private readonly emsSer:EmsServiceService,
    private readonly router:Router,
    private readonly authService:AuthService,
    private readonly snackBar:MatSnackBar
  ) { }

  ngOnInit(): void {
    this.formInitialize();
    console.log(this.authService.isUserLoggedInSubject.value);
  }

  loginForm!: FormGroup;

  formInitialize() {
    this.loginForm = this.fb.group({
      email:['', Validators.email],
      username: ['', Validators.required],
      password: ['', Validators.required],
      roleSelection:['', Validators.required]
    })
  }

  toggleForm:boolean = false;

  userRoles = [
    {role:Role.ADMIN, value:'Admin'},
    {role:Role.MANAGER, value:'Manager'},
    {role: Role.EMPLOYEE, value:'Employee'}
  ];

  // setFalse(){
  //   this.emsSer.isLoggedInSubject.next(false);
  // }

  onSignupClick(){
    this.toggleForm = !this.toggleForm;
  }

  username:string = '';

  password:string = '';

  userDetails:LoginResponse = {
    uid: '',
    username: '',
    email: '',
    jwt: ''
  };

  onSubmit(){
    // // this.emsSer.isLoggedInSubject.next(true);
    this.username = this.loginForm.get('username')?.value;
    this.password = this.loginForm.get('password')?.value;

    this.authService.loginUser(this.username, this.password).subscribe({
      next:(res:LoginResponse) => {
        this.snackBar.open('Successfull Loggedin','close',{duration:3000});
        this.authService.saveToken(res.jwt);
        this.router.navigate([PATH_HOME]);
      },
      error:(err) => {
        console.log(err.error);
        this.snackBar.open('invalid username or passsword','close',{duration:3000});
      }
    })
  }
}
