import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StackCardMasterComponent } from './stack-card-master.component';

describe('StackCardMasterComponent', () => {
  let component: StackCardMasterComponent;
  let fixture: ComponentFixture<StackCardMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StackCardMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StackCardMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
