import { Component, OnInit, ViewChild } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { PaymentsModel } from 'src/app/shared/models/payments.model';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss']
})
export class PaymentsComponent implements OnInit {
  isLoading: boolean;
  payments: PaymentsModel[] | any;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  displayedColumns: string[] = [ 'tableNumber', 'category', 'items', 'quantity', 'price', 'amount', 'status' ];

  dataSource;
  data;
  pageIndex: number;
  pageSize: number;
  total: number;


  constructor(
  ) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.loadData();
  }


  async loadData() {
  }

}
