import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchemeCommodityMasterComponent } from './scheme-commodity-master.component';

describe('SchemeCommodityMasterComponent', () => {
  let component: SchemeCommodityMasterComponent;
  let fixture: ComponentFixture<SchemeCommodityMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchemeCommodityMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchemeCommodityMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
