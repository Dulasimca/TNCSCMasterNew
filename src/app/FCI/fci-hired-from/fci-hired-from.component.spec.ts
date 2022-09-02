import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FciHiredFromComponent } from './fci-hired-from.component';

describe('FciHiredFromComponent', () => {
  let component: FciHiredFromComponent;
  let fixture: ComponentFixture<FciHiredFromComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FciHiredFromComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FciHiredFromComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
