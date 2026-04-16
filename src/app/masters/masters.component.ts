import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatButton } from "@angular/material/button";
import { MatIcon } from "@angular/material/icon";
import { MatRipple, MatOption } from "@angular/material/core";
import { MatFormFieldModule } from "@angular/material/form-field";
import { CommonModule } from '@angular/common';
import { MatInput } from "@angular/material/input";
import { BehaviorSubject, debounceTime, distinctUntilChanged, filter, from, interval, map, Observable, of, pipe, startWith, Subject, switchMap, timer } from 'rxjs';
import { MatSelect } from "@angular/material/select";
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { EmsServiceService } from '../services/ems-service.service';


@Component({
  selector: 'app-masters',
  standalone: true,
  imports: [ MatFormFieldModule, CommonModule, FormsModule, ReactiveFormsModule, MatAutocompleteModule, MatProgressSpinnerModule],
  templateUrl: './masters.component.html',
  styleUrl: './masters.component.scss'
})
export class MastersComponent implements OnInit {

  constructor(private readonly http: HttpClient,
    private readonly formBuilder: FormBuilder,
    private readonly changeDetctionRef:ChangeDetectorRef,
    private readonly ems:EmsServiceService
  ) {}
  ngOnInit(): void {
  }
}
