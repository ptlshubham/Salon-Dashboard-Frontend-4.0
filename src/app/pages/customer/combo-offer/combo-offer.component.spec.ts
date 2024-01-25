import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComboOfferComponent } from './combo-offer.component';

describe('ComboOfferComponent', () => {
  let component: ComboOfferComponent;
  let fixture: ComponentFixture<ComboOfferComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComboOfferComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ComboOfferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
