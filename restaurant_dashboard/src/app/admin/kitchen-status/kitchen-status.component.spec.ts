import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KitchenStatusComponent } from './kitchen-status.component';

describe('KitchenStatusComponent', () => {
  let component: KitchenStatusComponent;
  let fixture: ComponentFixture<KitchenStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KitchenStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KitchenStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
