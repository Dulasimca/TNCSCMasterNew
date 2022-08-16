import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GodownMasterComponent } from './godown-master.component';

describe('GodownMasterComponent', () => {
  let component: GodownMasterComponent;
  let fixture: ComponentFixture<GodownMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GodownMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GodownMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
