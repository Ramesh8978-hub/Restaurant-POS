import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddExpensesTypeComponent } from './add-expenses-type.component';

describe('AddExpensesTypeComponent', () => {
  let component: AddExpensesTypeComponent;
  let fixture: ComponentFixture<AddExpensesTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddExpensesTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddExpensesTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
