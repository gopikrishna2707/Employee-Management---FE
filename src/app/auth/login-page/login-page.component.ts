import { Component, OnInit } from '@angular/core';
import { MatFormField, MatFormFieldModule, MatLabel } from "@angular/material/form-field";
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButton } from "@angular/material/button";
import { EmsServiceService } from '../../services/ems-service.service';
import { Route, Router } from '@angular/router';
import { PATH_EMPLOYEE, PATH_HOME, PATH_LOGIN } from '../../app.routes';
import { MatSelect, MatOption } from "@angular/material/select";
import { MatCard } from "@angular/material/card";
import { Role } from '../../models/Employee';
import { AuthService } from '../auth.service';
import { LoginResponse } from '../../models/LoginResponse';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { UserRoles } from '../../models/UserRoles';

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
    MatCard,
    MatTabsModule
],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss'
})
export class LoginPageComponent implements OnInit {

  loginForm!: FormGroup;

  signUpForm!:FormGroup;

  toggleForm = false;

  userRoles = [
    { role: UserRoles.ROLE_ADMIN},
    { role: UserRoles.ROLE_EMPLOYEE},
    { role: UserRoles.ROLE_MANAGER}
  ];

  constructor(
    private readonly fb: FormBuilder,
    private readonly router: Router,
    private readonly authService: AuthService,
    private readonly snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.formInitialize();
    if (this.authService.isLoggedIn$) {
      this.router.navigate([PATH_HOME]);
    }
  }

  formInitialize() {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
    this.signUpForm = this.fb.group({
      email:['', Validators.required],
      userNameSignup:['', Validators.required],
      roles:['', Validators.required],
      passwordSignup:['', Validators.required]
    })
  }

  onSignupClick() {
    const {email,userNameSignup:username,passwordSignup:password, roles} = this.signUpForm.getRawValue();

    this.authService.sighupUser(email,username,password,roles).subscribe({
      next:(res) => {
        console.log(res);
        this.router.navigate([PATH_LOGIN]);
      },
      error:(err) => {
        console.log(err);
      }
    })
  }

  onSubmit() {

    // if (this.loginForm.invalid) return;
    const { username, password } = this.loginForm.value;
    console.log('login clicked');

    this.authService.loginUser(username, password).subscribe({
      next: () => {
        this.snackBar.open('Successfully logged in', 'Close', {
          duration: 3000
        });
        this.router.navigate([PATH_HOME]);
      },
      error: () => {
        this.snackBar.open(
          'Invalid username or password',
          'Close',
          { duration: 3000 }
        );
      }
    });
  }
}
