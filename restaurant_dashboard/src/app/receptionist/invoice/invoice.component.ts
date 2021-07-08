import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { OrdersService } from 'src/app/shared/services/orders.service';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss']
})
export class InvoiceComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  tablenumber: number;
  orderStatusdata: any;
  orderid: any;
  orderItems;
  discount;
  amount;
  discountAmount;
  totalAmount;
  orderWaiterId: any;
  dateTime: any;
  pageLength: number;
  pageIndex: number;
  pageSize: number;
  total: number;
  isLoading: boolean;
  updatedBy: number;

  constructor(
    private ordersService: OrdersService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
  ) { }

  displayedColumns: string[] = [
    'itemName',
    'price',
    'quantity',
    'amount',
  ];

  ngOnInit(): void {
    this.tablenumber = parseInt(this.route.snapshot.paramMap.get('id'));
    this.updatedBy = parseInt(window.localStorage.getItem('id'));
    this.getOrderedItems();
    this.dateTime = new Date();
  }

  printPage() {
    this.updatestatus();
    const printContent = document.getElementById('componentID');
    const WindowPrt = window.open('', '', 'left=0,top=0,toolbar=0,scrollbars=0,status=0');
    WindowPrt.document.write(printContent.innerHTML);
    WindowPrt.document.close();
    WindowPrt.focus();
    WindowPrt.print();
    WindowPrt.close();
  }
  getOrderedItems() {
    this.ordersService.getOrderItems(this.tablenumber).subscribe(orders => {
      this.orderItems = orders;
      this.orderid = this.orderItems[0].order.id;
      this.amount = this.orderItems[0].order.amount;
      this.discount = this.orderItems[0].order.discount;
      this.discountAmount = this.orderItems[0].order.discountAmount;
      this.totalAmount = this.orderItems[0].order.totalAmount;
      this.orderStatusdata = this.orderItems[0].order.orderStatus.orderStatus;
      this.orderWaiterId = this.orderItems[0].order.waiter.username;
      this.orderItems = new MatTableDataSource(this.orderItems);
      this.orderItems.paginator = this.paginator;
      this.pageLength = this.paginator.length;
      this.orderItems.sort = this.sort;

    });

  }
  updatestatus() {
    const data = {
      updatedBy: this.updatedBy
    };
    this.ordersService.updateOrdersStatus(this.orderid, data).subscribe((data) => {
      if (data) {
        this.snackBar.open(' OrderstatusDetails Updated!', 'Success', {
          duration: 2000,
        });
      }
    },
    (err) => console.log('invoice details fetched failed!'));
  }
}
