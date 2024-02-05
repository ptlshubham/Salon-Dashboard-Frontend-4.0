import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalonRegistartionComponent } from './salon-registartion.component';

describe('SalonRegistartionComponent', () => {
  let component: SalonRegistartionComponent;
  let fixture: ComponentFixture<SalonRegistartionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SalonRegistartionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SalonRegistartionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
