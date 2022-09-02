import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FciHiredByComponent } from './fci-hired-by.component';

describe('FciHiredByComponent', () => {
  let component: FciHiredByComponent;
  let fixture: ComponentFixture<FciHiredByComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FciHiredByComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FciHiredByComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
