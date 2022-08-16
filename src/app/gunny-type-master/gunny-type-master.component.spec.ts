import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GunnyTypeMasterComponent } from './gunny-type-master.component';

describe('GunnyTypeMasterComponent', () => {
  let component: GunnyTypeMasterComponent;
  let fixture: ComponentFixture<GunnyTypeMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GunnyTypeMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GunnyTypeMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
