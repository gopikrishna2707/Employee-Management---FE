import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatCard, MatCardHeader, MatCardContent } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { EmsServiceService } from '../../services/ems-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { NgIf } from '@angular/common';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@Component({
  selector: 'app-add-employees-dialog',
  standalone: true,
  imports: [
    MatCard,
    MatCardHeader,
    MatCardContent,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatButton,
    NgIf,
    MatProgressSpinnerModule,
  ],
  templateUrl: './add-employees-dialog.component.html',
  styleUrl: './add-employees-dialog.component.scss',
})
export class AddEmployeesDialogComponent implements OnInit {
  constructor(
    private readonly emsService: EmsServiceService,
    private readonly snackBar: MatSnackBar,
    private readonly route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getEid();
    this.formInitialize();
  }

  addFormControl!: FormGroup;

  employeeEid: string = '';

  isEditMode: boolean = false;

  employeeDetails: any[] = [];

  formInitialize(): void {
    this.addFormControl = new FormGroup({
      nameField: new FormControl({ value: '', disabled: false }),
      emailForm: new FormControl({ value: '', disabled: false }),
      skillsForm: new FormControl({ value: '', disabled: false }),
      deptForm: new FormControl({ value: '', disabled: false }),
      locationForm: new FormControl({ value: '', disabled: false }),
      expForm: new FormControl({ value: '', disabled: false }),
      reportForm: new FormControl({ value: '', disabled: false }),
      designationForm: new FormControl({ value: '', disabled: false }),
      managerForm: new FormControl({ value: '', disabled: false }),
      joinForm: new FormControl({ value: '', disabled: false }),
      personalForm: new FormControl({ value: '', disabled: false }),
      workForm: new FormControl({ value: '', disabled: false }),
      salaryForm:new FormControl({value:'', disabled:false})
    });
  }

  isSpin:boolean = false;
  saveForm(): void {
    this.isSpin = true;
    const payload: any = {
      name: this.addFormControl.value.nameField,
      email: this.addFormControl.value.emailForm,
      department: this.addFormControl.value.deptForm,
      location: this.addFormControl.value.locationForm,
      designation: this.addFormControl.value.designationForm,
      reportingManager: this.addFormControl.value.reportForm,
      reportingManagerMail: this.addFormControl.value.managerForm,
      joinedDate: this.addFormControl.value.joinForm,
      experience: this.addFormControl.value.expForm,
      currentlyWorking: this.addFormControl.value.workForm ?? 'Yes',
      skills: this.addFormControl.value.skillsForm,
      personalDetails: this.addFormControl.value.personalForm,
      salaryForm: this.addFormControl.value.salaryForm
    };

    this.emsService.addEmployee(payload).subscribe({
      next: () => {
        console.log('success');
        this.snackBar.open('successfully added', 'close', { duration: 3000 });
        this.addFormControl.reset();
        this.isSpin = false;
      },
      error: (err: any) => {
        console.log(err);
        this.addFormControl.reset();
        const errMsg = err.error?.error;
        this.isSpin =false;
        this.snackBar.open(errMsg, 'close', { duration: 3000 });

      },
    });
  }

  getEmployeeById() {
    this.isSpin = true;
    this.emsService.employeeById(this.employeeEid).subscribe({
      next: (res) => {
        this.employeeDetails = res;
        this.addFormControl.patchValue({
          nameField: res.name,
          emailForm: res.email,
          skillsForm: res.skills,
          deptForm: res.department,
          locationForm: res.location,
          expForm: res.experience,
          reportForm: res.reportingManager,
          designationForm: res.designation,
          managerForm: res.reportingManagerMail,
          joinForm: res.joinedDate,
          personalForm: res.personalDetails,
          workForm: res.currentlyWorking,
          salaryForm: res.salary
        });
        this.isSpin =false;
      },
      error: (err) => {
        const errMsg = err.error?.error || 'Something went wrong!';
        this.isSpin = false;
        this.snackBar.open(errMsg, 'Close', { duration: 3000 });
      },
    });
  }

  getEid() {
    this.route.url.subscribe((segments) => {
      const path = segments.map((s) => s.path).join('/');
      if (path.includes('edit')) {
        this.isEditMode = true;
        console.log(this.isEditMode);
      } else {
        this.isEditMode = false;
      }
    });
    this.route.paramMap.subscribe((params) => {
      this.employeeEid = params.get('eid')!;
    });

    if (this.isEditMode && this.employeeEid) {
      this.getEmployeeById();
    }
  }

  updateFormDetails(){
    this.isSpin = true;
    const payload: any = {
      name: this.addFormControl.value.nameField,
      email: this.addFormControl.value.emailForm,
      department: this.addFormControl.value.deptForm,
      location: this.addFormControl.value.locationForm,
      designation: this.addFormControl.value.designationForm,
      reportingManager: this.addFormControl.value.reportForm,
      reportingManagerMail: this.addFormControl.value.managerForm,
      joinedDate: this.addFormControl.value.joinForm,
      experience: this.addFormControl.value.expForm,
      currentlyWorking: this.addFormControl.value.workForm,
      skills: this.addFormControl.value.skillsForm,
      personalDetails: this.addFormControl.value.personalForm,
    };

    this.emsService.updateEmployeeById(this.employeeEid, payload).subscribe({
      next:(next) => {
        console.log("updated");
        this.snackBar.open('Updated succesfully', 'close', {duration:3000});
        this.isSpin = false;
        this.addFormControl.markAsPristine();
      },
      error:(err) => {
        const errMsg = err.error?.error || 'Something went wrong!';
        this.isSpin = false;
        this.snackBar.open(errMsg, 'Close', { duration: 3000 });
      }
    })
  }
}
