import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUserStatusComponent } from './add-user-status.component';

describe('AddUserStatusComponent', () => {
  let component: AddUserStatusComponent;
  let fixture: ComponentFixture<AddUserStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddUserStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUserStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
