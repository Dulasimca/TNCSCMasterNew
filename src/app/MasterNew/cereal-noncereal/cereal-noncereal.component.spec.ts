import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CerealNoncerealComponent } from './cereal-noncereal.component';

describe('CerealNoncerealComponent', () => {
  let component: CerealNoncerealComponent;
  let fixture: ComponentFixture<CerealNoncerealComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CerealNoncerealComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CerealNoncerealComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
