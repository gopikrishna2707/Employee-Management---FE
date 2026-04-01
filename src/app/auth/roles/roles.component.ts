import { Component, inject, OnInit } from '@angular/core';
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { EmsServiceService } from '../../services/ems-service.service';
import {MatListModule} from '@angular/material/list';
import { CommonModule } from '@angular/common';
import { Permission, Role } from '../../models/Employee';
import { MatButton, MatButtonModule } from "@angular/material/button";
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-roles',
  standalone: true,
  imports: [MatCardModule, MatFormFieldModule, MatInputModule, MatIconModule, MatListModule, CommonModule, MatButtonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './roles.component.html',
  styleUrl: './roles.component.scss'
})
export class RolesComponent implements OnInit {

  constructor(){}

  ngOnInit(){
    this.getAllUserDetails();
  }

  emsService = inject(EmsServiceService);

  UserDetails:any[] = [];

  filteredList:any[] = [];

  roles = Object.values(Role);

  permissions = Object.values(Permission);

  searchControl = new FormControl('');

  userForm = new FormGroup({
    selectedRoles: new FormControl({value:[], disabled:true}),  
    selectedPermissions: new FormControl({value:[], disabled:true})
  });

  getAllUserDetails(){
    this.emsService.getAllUserRolesandPermissions().subscribe({
      next:(res) => {
        this.UserDetails = res;
      }
    })
  }

  searchDebounce(){
    this.searchControl.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
    ).subscribe(value => {
      this.getUser(value);
    })
  }
  getUser(key:string | null){
    this.filteredList = this.UserDetails.filter(user => 
      user.userName.toLowerCase().includes(key));
  }

  onSubmit(){
    console.log(this.userForm.value);
  }

  onCancel(){
    console.log('cancel');
    this.userForm.reset();
  }
}
