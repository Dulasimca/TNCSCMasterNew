import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuantityMasterComponent } from './quantity-master.component';

describe('QuantityMasterComponent', () => {
  let component: QuantityMasterComponent;
  let fixture: ComponentFixture<QuantityMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuantityMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuantityMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
