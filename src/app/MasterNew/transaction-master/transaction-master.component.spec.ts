import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionMasterComponent } from './transaction-master.component';

describe('TransactionMasterComponent', () => {
  let component: TransactionMasterComponent;
  let fixture: ComponentFixture<TransactionMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransactionMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
