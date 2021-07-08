import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOrdersStatusComponent } from './add-orders-status.component';

describe('AddOrdersStatusComponent', () => {
  let component: AddOrdersStatusComponent;
  let fixture: ComponentFixture<AddOrdersStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddOrdersStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddOrdersStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
