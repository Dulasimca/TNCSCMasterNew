import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllotmentQuantityComponent } from './allotment-quantity.component';

describe('AllotmentQuantityComponent', () => {
  let component: AllotmentQuantityComponent;
  let fixture: ComponentFixture<AllotmentQuantityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllotmentQuantityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllotmentQuantityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
