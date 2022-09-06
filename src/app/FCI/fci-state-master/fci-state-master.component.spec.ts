import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FciStateMasterComponent } from './fci-state-master.component';

describe('FciStateMasterComponent', () => {
  let component: FciStateMasterComponent;
  let fixture: ComponentFixture<FciStateMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FciStateMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FciStateMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
