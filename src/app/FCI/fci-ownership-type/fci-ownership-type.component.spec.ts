import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FciOwnershipTypeComponent } from './fci-ownership-type.component';

describe('FciOwnershipTypeComponent', () => {
  let component: FciOwnershipTypeComponent;
  let fixture: ComponentFixture<FciOwnershipTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FciOwnershipTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FciOwnershipTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
