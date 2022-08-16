import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WeighmentMasterComponent } from './weighment-master.component';

describe('WeighmentMasterComponent', () => {
  let component: WeighmentMasterComponent;
  let fixture: ComponentFixture<WeighmentMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeighmentMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeighmentMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
