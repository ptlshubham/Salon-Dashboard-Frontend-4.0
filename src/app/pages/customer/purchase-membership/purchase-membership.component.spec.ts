import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseMembershipComponent } from './purchase-membership.component';

describe('PurchaseMembershipComponent', () => {
  let component: PurchaseMembershipComponent;
  let fixture: ComponentFixture<PurchaseMembershipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PurchaseMembershipComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PurchaseMembershipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
