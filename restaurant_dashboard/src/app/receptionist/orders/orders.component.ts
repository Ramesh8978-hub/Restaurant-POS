import { MatSnackBar } from '@angular/material/snack-bar';
import { OrdersService } from 'src/app/shared/services/orders.service';
import { TablesService } from 'src/app/shared/services/tables.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { PaymentDetailsComponent } from './payment-details/payment-details.component';
import { environment } from 'src/environments/environment';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
})
export class OrdersComponent implements OnInit {
  Url = environment.root;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  simpleDialog: MatDialogRef<PaymentDetailsComponent>;
  orderStatus;
  orderItems;
  id: number;
  pageLength: number;
  pageIndex: number;
  pageSize: number;
  total: number;
  isLoading: boolean;
  tablenumber;
  totalLength = [10];
  orderStatusdata: any;
  div1: boolean;
  served: boolean;
  orderWaiterId: any;
  orderid: any;
  amount: any;
  totalAmount: any;
  tableId;
  ordersId: any;
  TempData;
  TotalCost = 0;
  waiterId: number;
  total1: number;
  tId:number
  data:any
  noData = {
    noDataFound: 'No Data Found',
    image: '../assets/no_data_found.png'
  };
  constructor(
    private tableService: TablesService,
    private ordersService: OrdersService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private router:Router,
    private route: ActivatedRoute,
  ) {}
  displayedColumns: string[] = [
    'id',
    'category',
    'image',
    'kitchenStatus',
    'itemName',
    'price',
    'quantity',
    'amount',
    'actions',
  ];

  ngOnInit(): void {
    this.id = parseInt(window.localStorage.getItem('id'));
    this.tId = parseInt(this.route.snapshot.paramMap.get('id'));
    console.log(this.tId);
    
    this.waiterId = parseInt(window.localStorage.getItem('id'));
    this.isLoading = true;
    this.getTablesData();
    this.div1 = false;
    this.served = false;
    if(this.tId){
      this.getOrderedItems(this.tId)
    }
  }

  getOrderedItems(id:number){
    this.ordersId = id
    
    this.ordersService.getOrderItems(id).subscribe((orders) => {
      this.TempData = orders;
      // this.data = this.TempData[0]
      this.TotalCost = this.TempData.map(t => t.amount).reduce((acc, value) => acc + value, 0);
      this.isLoading = false;
      this.orderItems = orders;
      this.total = this.orderItems.length;
      this.orderid = this.orderItems[0].order.id;
      this.orderStatusdata = this.orderItems[0].order.orderStatus.orderStatus;
      this.orderWaiterId = this.orderItems[0].order.waiter.username;
      this.orderItems = new MatTableDataSource(this.orderItems);
      this.orderItems.paginator = this.paginator;
      this.orderItems.sort = this.sort;
      if (this.total > 100) {
        this.totalLength = [10, 25, 50, 100, this.total];
      } else {
        this.totalLength = [10, 25, 50, 100];
      }
      if (this.orderStatusdata === 'Finished') {
        this.div1 = true;
        this.served = false;
      } else if (this.orderStatusdata === 'Served') {
        this.div1 = false;
        this.served = true;
      } else if (this.orderStatusdata === undefined) {
        this.served = false;
      } else {
        this.div1 = false;
        this.served = false;
      }
    });
  }

  getTablesData() {
    this.tableService.getServedTables().subscribe((data) => {
      this.orderStatus = data;
      this.total1 = this.orderStatus.length;
    });
  }


  increaseQty(data: any) {
    const order = {
      amount: this.TotalCost,
      discount: 0,
      updatedBy: this.waiterId
    };
    data.updatedBy = this.id;
    data.quantity++;
    this.ordersService.updateQuantity(data.id, data).subscribe((orders) => {
      this.ordersService.updateOrdersAmount(this.orderid, order).subscribe(resp => {
        this.getOrderedItems(this.ordersId);
      });
    });
  }

  decreaseQty(data: any) {
    const order = {
      amount: this.TotalCost,
      discount: 0,
      updatedBy: this.waiterId
    };
    if (data.quantity > 1) {
      data.quantity--;
      data.updatedBy = this.id;
      this.ordersService
        .updateQuantity(data.id, data)
        .subscribe((orders) => {
          this.ordersService.updateOrdersAmount(this.orderid, order).subscribe(resp => {
            this.getOrderedItems(this.ordersId);
          });
        });
    }
  }

  deleteItemData(id: number, status:string) {
    if (status === 'Served' || status === 'Finished') {
      Swal.fire("This item was can't be delete")
    }
    else{
      if (window.confirm('Are you sure you want to delete?')) {
        const order = {
        amount: this.TotalCost,
        discount: 0,
        updatedBy: this.waiterId
      };
        this.ordersService.deleteOdersItems(id).subscribe((data) => {
        this.ordersService.updateOrdersAmount(this.orderid, order).subscribe(resp => {
          this.getOrderedItems(this.ordersId);
        });
        this.snackBar.open('Order Item Deleted', 'Ok', {
          duration: 2000,
        });
      });
      } else {
        console.log('Delete Item Rejected!..');
      }
    }
  }

  totalOrders() {
    this.ordersService.setter(this.tableId.id);
    this.simpleDialog = this.dialog.open(PaymentDetailsComponent);
    this.simpleDialog.afterClosed().subscribe((res) => {
      this.ordersService.onSelectTables.next([]);
    });
  }

  updateOrderStatus() {
    const data = {
      updatedBy: this.id,
    };
    this.ordersService
      .changeOrderStatusFinish(this.orderid, data)
      .subscribe((data) => {
        this.getOrderedItems(this.ordersId);
        if (data) {
          this.snackBar.open(' Order Details Updated!', 'Success', {
            duration: 2000,
          });
        } else {
          this.snackBar.open(' Order Details Not Updated!', 'Error', {
            duration: 2000,
          });
        }
      });
  }
}











