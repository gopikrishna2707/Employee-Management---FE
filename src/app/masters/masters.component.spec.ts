import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MastersComponent } from './masters.component';
import { EmsServiceService } from '../services/ems-service.service';
import { of } from 'rxjs';

describe('MastersComponent', () => {
  let component: MastersComponent;
  let fixture: ComponentFixture<MastersComponent>;
  let service:EmsServiceService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MastersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MastersComponent);
    service = TestBed.inject(EmsServiceService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
