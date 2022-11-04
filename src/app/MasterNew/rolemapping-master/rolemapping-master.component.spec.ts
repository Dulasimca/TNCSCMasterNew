import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RolemappingMasterComponent } from './rolemapping-master.component';

describe('RolemappingMasterComponent', () => {
  let component: RolemappingMasterComponent;
  let fixture: ComponentFixture<RolemappingMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RolemappingMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RolemappingMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
