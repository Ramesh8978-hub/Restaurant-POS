import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AvailableOrderTablesComponent } from './available-order-tables.component';

describe('AvailableOrderTablesComponent', () => {
  let component: AvailableOrderTablesComponent;
  let fixture: ComponentFixture<AvailableOrderTablesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AvailableOrderTablesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AvailableOrderTablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
