import { MatSnackBar } from '@angular/material/snack-bar';
import { OrderStatusService } from './../../shared/services/order-status.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { AddOrdersStatusComponent } from './add-orders-status/add-orders-status.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-order-status',
  templateUrl: './order-status.component.html',
  styleUrls: ['./order-status.component.scss']
})
export class OrderStatusComponent implements OnInit {
  isLoading: boolean;
  dataSource;
  data;
  id;
  orderForm;
  pageIndex: number;
  pageSize: number;
  total: number;
  totalLength = [10];
  maxall: number = 20;
  displayedColumns: string[] = ['id', 'orderStatus', 'username', 'createdAt', 'status'];
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  noData = {
    noDataFound: 'No Data Found',
    image: '/assets/no_data_found.png'
  };
  simpleDialog: MatDialogRef<AddOrdersStatusComponent>;

  constructor(
    public dialog: MatDialog,
    private snackbar: MatSnackBar,
    private orderStatusService: OrderStatusService) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.id = parseInt(window.localStorage.getItem('id'));
    this.ReadOrderStatusDetails();
  }

  ReadOrderStatusDetails() {
    this.orderStatusService.getOrdersStatusDetails().subscribe(data => {
      this.dataSource = data;
      this.isLoading = false;
      this.dataSource = new MatTableDataSource(this.dataSource);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.total = this.dataSource.data.length;
      this.totalLength = this.dataSource.data.length;
      if (this.total > 100) {
        this.totalLength = [10, 25, 50, 100, this.total];
      }
      else {
        this.totalLength = [10, 25, 50, 100];
      }
    });
  }
  openDialog() {
    const id = undefined;
    this.orderStatusService.setter(id);
    this.simpleDialog = this.dialog.open(AddOrdersStatusComponent);
    this.simpleDialog.afterClosed().subscribe(res => {
      this.orderStatusService.onSelectOrder.next([]);
      this.ReadOrderStatusDetails();
    });
  }

  async changeStatus(id: number, status: boolean) {
    if (status === false) {
      status = true;
    }
    else {
      status = false;
    }
    this.orderForm = {
      status,
      updatedBy: this.id,
    };
    this.orderStatusService.updateStatus(id, this.orderForm).subscribe(data => {
      this.ReadOrderStatusDetails();
    });
  }

  applyFilter(event: string) {
    this.dataSource.filter = event.trim().toLowerCase();
  }

  UpdateOrderStatus(id: number) {
    this.orderStatusService.setter(id);
    this.simpleDialog = this.dialog.open(AddOrdersStatusComponent);
    this.simpleDialog.afterClosed().subscribe(res => {
      this.orderStatusService.onSelectOrder.next([]);
      this.ReadOrderStatusDetails();
    });
  }

  DeleteOrderStatus(table: any) {
    if (confirm("Are you sure! You want to delete this record?") === true) {
      this.orderStatusService.deleteOrdersStatus(table).subscribe(data => {
        this.ReadOrderStatusDetails();
        this.snackbar.open('OrderStatus Deleted', 'Ok', {
          duration: 2000
        });
      });
    }
  }
}
