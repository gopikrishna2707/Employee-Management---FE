import { Component, OnInit } from '@angular/core';
import { MatButton } from "@angular/material/button";
import { MatIcon } from "@angular/material/icon";
import { MatRipple, MatOption } from "@angular/material/core";
import { MatFormFieldModule } from "@angular/material/form-field";
import { CommonModule } from '@angular/common';
import { MatInput } from "@angular/material/input";
import { BehaviorSubject, debounceTime, filter, from, interval, map, Observable, of, pipe, startWith, Subject, timer } from 'rxjs';
import { MatSelect } from "@angular/material/select";
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatAutocompleteModule } from '@angular/material/autocomplete';


@Component({
  selector: 'app-masters',
  standalone: true,
  imports: [MatButton, MatIcon, MatFormFieldModule, CommonModule, MatSelect, MatOption, FormsModule, ReactiveFormsModule, MatInput, MatAutocompleteModule],
  templateUrl: './masters.component.html',
  styleUrl: './masters.component.scss'
})
export class MastersComponent implements OnInit {

  constructor(private readonly http: HttpClient,
    private readonly formBuilder: FormBuilder
  ) {
    //first way to create a observable
    //observable creating
    const data$ = new Observable(val => {
      val.next("first obs");
    });

    //observable accessing 
    data$.subscribe((val: any) => {
      console.log(val);
    })

    this.newData$.subscribe(val => {
      console.log(val);
    })

    //secomd way
    this.arr$.subscribe(val => {
      console.log(val);
    });

    this.arrFrom$.subscribe(val => {
      console.log(val);
    });

    this.arrFrom$.pipe(
      filter(val => val === val.toLowerCase())
    ).subscribe(val => {
      console.log(val);
    })//if u want to transform a value use map

    this.arrFrom$.pipe(
      map(val => val.toUpperCase())
    ).subscribe(val => console.log(val));

    //used for setInterval which will load after time
    this.myInterva$.subscribe((res) => {
      console.log('timer' + res);
    })

    //used for setTimeout which will exceute after time
    this.timer$.subscribe((val) => {
      console.log('exceute after time' + val);
    })

    this.arr$.pipe(
      map(res => res.filter(s => s.charAt(0) == 'a'))
    ).subscribe(val => {
      console.log(val);
    })
  }
  ngOnInit(): void {
    this.loadData();
    this.initializeForm();
    this.getFormValue();
    this.setUpFilter();
    this.printValues();
    this.initilizeSubject();
  }

  newData$ = new Observable(val => {
    val.next('1');
  })


  //second way to create obs using of
  arr: string[] = ['a', 'b', 'v'];

  arr$ = of(this.arr);//of opeartor is used to crete an observable

  arrFrom$ = from(this.arr);//from op is used to create an observable


  //interval like setinterval
  myInterva$ = interval(10000000);

  //timer like setTimeout
  timer$ = timer(2000);


  userList: any[] = [];

  loadData() {
    this.http.get('https://jsonplaceholder.typicode.com/users').subscribe({
      next: (res: any) => {
        this.userList = res;
        console.log(this.userList);
      },
      error: (err) => {
        console.log('err', err);
      }
    })
  }


  formGroup!: FormGroup;

  initializeForm() {
    this.formGroup = this.formBuilder.group({
      userDropDown: ['',]
    })
  }

  getFormValue() {

  }

  filterList: any[] = [];
  
  displayUser = (user: any) => user?.name ?? '';

  // setUpFilter(event:Event){
  //   debugger
  //  const input = event.target as HTMLInputElement;
  //  const value = input.value;
  //  this.filteredList(value);
  // }

  // filteredList(value:any) {
  //   debugger
  //   const val = value.trim().toLowerCase();
  //   this.filterList =  this.userList.filter(user =>
  //     user.name.toLowerCase().includes(val)
  //   )
  //   console.log(this.filterList);
  // }

  // setUpFilter() {
  //   this.formGroup.get('userDropDown')!
  //     .valueChanges
  //     .subscribe(value => {
  //       console.log('valueChanges:', value);
  //       this.filterList = this.filteredList(value);
  //     });
  // }

  setUpFilter(){
    this.formGroup.get('userDropDown')?.valueChanges.pipe(
      debounceTime(300),
      filter(val => typeof val === 'string' && val.length >2)
    ).subscribe(
      (value:any) => {
        console.log(value);
        this.filterList = this.filteredList(value);
      }
    )
  }
  
  filteredList(value:any){
    value = value.trim().toLowerCase();
    return this.userList.filter(user => 
      user.name.toLowerCase().includes(value)
    )
  }

  // setUpFilter(){
  //   debugger
  //   this.formGroup.get('userDropDown')?.valueChanges.subscribe(
  //     value => {
  //       console.log(value);
  //       this.filterList = this.applyfilter(value);
  //     }
  //   )
  // }

  // applyfilter(value:any){
  //   debugger
  //   const val = value.trim().toLowerCase();
  //   return this.userList.filter(user => {
  //     user.name.toLowerCase().includes(val);
  //   })
  // }

  subject$ = new Subject();

  subject2$ = new Subject<number>();


  initilizeSubject(){
    setTimeout(() => {
      this.subject$.next('added');
    }, 4000);
    this.subject2$.next(2);
  }

  printValues(){
    this.subject$.subscribe(val => {
      console.log(val);
    })
    this.subject2$.subscribe(val => {
      console.log(val);
    })
  }

















































  filesUpload: any[] = [];

  fileClicked(event: any) {
    const files: FileList = event.target.files;
    Array.from(files).forEach((file) => this.filesUpload.push(file));
  };

  onDragOver(event: Event) {
    event.preventDefault();
    event.stopPropagation();
  }
  onDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    const files = event.dataTransfer?.files;
    if (!files) return;
    this.filesUpload.push(...Array.from(files));
  }
}
