import { OrdersService } from '../../shared/services/orders.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-all-orders',
  templateUrl: './all-orders.component.html',
  styleUrls: ['./all-orders.component.scss'],
})
export class AllOrdersComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  id: number;
  pageLength: number;
  pageIndex: number;
  pageSize: number;
  total: number;
  isLoading: boolean;
  tablenumber;
  totalLength = [10, 20, 50, 100];
  dataSource;

  displayedColumns: string[] = [
    'id',
    'tableNumber',
    'amount',
    'discount',
    'discountAmount',
    'totalAmount',
    'waiter',
    'orderStatus',
    'date',
  //  'paymentMode',

  ];
  noData = {
    noDataFound: 'No Data Found',
    image: '../assets/no_data_found.png'
  };
  constructor(private orderService: OrdersService) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.getAllOrdersDetails();
  }

  getAllOrdersDetails() {
    this.orderService.getOrders().subscribe((data) => {
      this.isLoading = false;
      this.dataSource = data;
      this.dataSource = new MatTableDataSource(this.dataSource);
      this.total = this.dataSource.data.length;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
    if (this.total > 100) {
      this.totalLength = [10, 20, 50, 100, this.total];
    } else {
      this.totalLength = [10, 20, 50, 100];
    }
  }
}
