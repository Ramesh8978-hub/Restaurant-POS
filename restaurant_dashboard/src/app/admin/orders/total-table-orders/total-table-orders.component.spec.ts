import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalTableOrdersComponent } from './total-table-orders.component';

describe('TotalTableOrdersComponent', () => {
  let component: TotalTableOrdersComponent;
  let fixture: ComponentFixture<TotalTableOrdersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TotalTableOrdersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TotalTableOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
