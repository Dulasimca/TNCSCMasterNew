import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FciTehsildarMasterComponent } from './fci-tehsildar-master.component';

describe('FciTehsildarMasterComponent', () => {
  let component: FciTehsildarMasterComponent;
  let fixture: ComponentFixture<FciTehsildarMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FciTehsildarMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FciTehsildarMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
