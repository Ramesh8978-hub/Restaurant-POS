import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddKitchenStatusComponent } from './add-kitchen-status.component';

describe('AddKitchenStatusComponent', () => {
  let component: AddKitchenStatusComponent;
  let fixture: ComponentFixture<AddKitchenStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddKitchenStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddKitchenStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
