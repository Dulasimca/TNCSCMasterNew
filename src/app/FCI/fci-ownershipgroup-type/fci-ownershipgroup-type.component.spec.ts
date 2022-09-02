import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FciOwnershipgroupTypeComponent } from './fci-ownershipgroup-type.component';

describe('FciOwnershipgroupTypeComponent', () => {
  let component: FciOwnershipgroupTypeComponent;
  let fixture: ComponentFixture<FciOwnershipgroupTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FciOwnershipgroupTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FciOwnershipgroupTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
