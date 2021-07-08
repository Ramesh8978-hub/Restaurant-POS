import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFeedbackServiceComponent } from './add-feedback-service.component';

describe('AddFeedbackServiceComponent', () => {
  let component: AddFeedbackServiceComponent;
  let fixture: ComponentFixture<AddFeedbackServiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddFeedbackServiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddFeedbackServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
