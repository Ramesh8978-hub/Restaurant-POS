import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangPasswordComponent } from './chang-password.component';

describe('ChangPasswordComponent', () => {
  let component: ChangPasswordComponent;
  let fixture: ComponentFixture<ChangPasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangPasswordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
