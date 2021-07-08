import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AvailableWaitersComponent } from './available-waiters.component';

describe('AvailableWaitersComponent', () => {
  let component: AvailableWaitersComponent;
  let fixture: ComponentFixture<AvailableWaitersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AvailableWaitersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AvailableWaitersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
