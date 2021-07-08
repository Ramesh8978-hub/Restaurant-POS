import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPaymentsModeComponent } from './add-payments-mode.component';

describe('AddPaymentsModeComponent', () => {
  let component: AddPaymentsModeComponent;
  let fixture: ComponentFixture<AddPaymentsModeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddPaymentsModeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPaymentsModeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
