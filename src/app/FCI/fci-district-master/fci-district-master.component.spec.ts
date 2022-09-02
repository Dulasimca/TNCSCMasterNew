import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FciDistrictMasterComponent } from './fci-district-master.component';

describe('FciDistrictMasterComponent', () => {
  let component: FciDistrictMasterComponent;
  let fixture: ComponentFixture<FciDistrictMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FciDistrictMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FciDistrictMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
