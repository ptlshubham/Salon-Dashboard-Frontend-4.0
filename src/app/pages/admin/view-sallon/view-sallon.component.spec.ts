import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSallonComponent } from './view-sallon.component';

describe('ViewSallonComponent', () => {
  let component: ViewSallonComponent;
  let fixture: ComponentFixture<ViewSallonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewSallonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewSallonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
