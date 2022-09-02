import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FciCommodityMasterComponent } from './fci-commodity-master.component';

describe('FciCommodityMasterComponent', () => {
  let component: FciCommodityMasterComponent;
  let fixture: ComponentFixture<FciCommodityMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FciCommodityMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FciCommodityMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
