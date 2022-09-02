import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FciBagTypeComponent } from './fci-bag-type.component';

describe('FciBagTypeComponent', () => {
  let component: FciBagTypeComponent;
  let fixture: ComponentFixture<FciBagTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FciBagTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FciBagTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
