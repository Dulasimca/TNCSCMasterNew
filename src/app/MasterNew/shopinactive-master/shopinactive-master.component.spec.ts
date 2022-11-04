import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopinactiveMasterComponent } from './shopinactive-master.component';

describe('ShopinactiveMasterComponent', () => {
  let component: ShopinactiveMasterComponent;
  let fixture: ComponentFixture<ShopinactiveMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShopinactiveMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopinactiveMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
