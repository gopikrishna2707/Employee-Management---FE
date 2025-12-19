import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEmployeesDialogComponent } from './add-employees-dialog.component';

describe('AddEmployeesDialogComponent', () => {
  let component: AddEmployeesDialogComponent;
  let fixture: ComponentFixture<AddEmployeesDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEmployeesDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddEmployeesDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
