import { Component, inject, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { EmsServiceService } from '../../services/ems-service.service';
import { MatListModule } from '@angular/material/list';
import { CommonModule } from '@angular/common';
import { Permission, Role } from '../../models/Employee';
import { MatButton, MatButtonModule } from '@angular/material/button';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { debounceTime, distinctUntilChanged, filter, take } from 'rxjs';
import { AuthService } from '../../auth/auth.service';
import { UserDetails } from '../../models/UserDetails';
import { UserRoles } from '../../models/UserRoles';

@Component({
  selector: 'app-roles',
  standalone: true,
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatListModule,
    CommonModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  templateUrl: './roles.component.html',
  styleUrl: './roles.component.scss',
})
export class RolesComponent implements OnInit {
  constructor() {}

  ngOnInit() {
    this.getAllUserDetails();
    this.getUserDetails();
    this.attachRolesofUser();
  }

  emsService = inject(EmsServiceService);

  authService = inject(AuthService);

  UserDetails: any[] = [];

  filteredList: any[] = [];

  roles = Object.values(UserRoles);

  permissions = Object.values(Permission);

  searchControl = new FormControl('');

  loggedInDetails: UserDetails | null = null;

  isAdmin$ = this.authService.isAdmin$;

  userForm = new FormGroup({
    selectedRoles: new FormControl<UserRoles[]>({ value: [], disabled: true }),
    selectedPermissions: new FormControl({ value: [], disabled: true }),
  });

  getAllUserDetails() {
    this.authService.getAllUserRolesandPermissions().subscribe({
      next: (res) => {
        this.UserDetails = res;
      },
      error: (err) => {
        console.log('all users is not working', err);
      },
    });
  }

  getUserDetails() {
    this.authService.userDetails$
      .pipe(
        filter((user): user is UserDetails => !!user),
        take(1),
      )
      .subscribe((user) => {
        this.loggedInDetails = user;
        this.attachRolesofUser();
      });
  }

  searchDebounce() {
    this.searchControl.valueChanges
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe((value) => {
        this.getUser(value);
      });
  }

  getUser(key: string | null) {
    this.filteredList = this.UserDetails.filter((user) =>
      user.userName.toLowerCase().includes(key),
    );
  }

  onSubmit() {
    console.log(this.userForm.value);
  }

  onCancel() {
    console.log('cancel');
    this.userForm.reset();
    this.attachRolesofUser();
  }

  attachRolesofUser() {
    const control = this.userForm.get('selectedRoles');
    if (this.loggedInDetails?.roles.length) {
      control?.patchValue(this.loggedInDetails?.roles);
    }
    if (!this.loggedInDetails) {
      control?.disable();
      return;
    }
    // if (this.authService.hasRoleAdmin()) {
    //   control?.enable();
    // } 
    console.log(this.loggedInDetails);
  }
}
