import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RailYardMasterComponent } from './rail-yard-master.component';

describe('RailYardMasterComponent', () => {
  let component: RailYardMasterComponent;
  let fixture: ComponentFixture<RailYardMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RailYardMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RailYardMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
