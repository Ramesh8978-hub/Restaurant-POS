import { MatSort } from '@angular/material/sort';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { OrdersService } from 'src/app/shared/services/orders.service';
import { UsersService } from 'src/app/shared/services/users.service';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import * as XLSX from 'xlsx';
import 'jspdf-autotable';
import { jsPDF } from 'jspdf';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-waiter-orders',
  templateUrl: './waiter-orders.component.html',
  styleUrls: ['./waiter-orders.component.scss'],
  providers: [OrdersService, UsersService],
})
export class WaiterOrdersComponent implements OnInit {
  Url = environment.root;
  isLoading: boolean;
  displayedColumns: string[] = [
    'id',
    'tableNumber',
    'orderId',
    'username',
    'orderStatus',
    'amount',
    'discount',
    'totalAmount',
    'date',
  ];

  dataSource;
  data;
  updatedBy;
  changingStatus: boolean;
  status;
  imagepath;
  userStatus: string;
  name: string;
  id: number;
  pageIndex: number;
  pageSize: number;
  total: number;
  totalLength = [10];
  noData = {
    noDataFound: 'No Data Found',
    image: '/assets/no_data_found.png'
  };
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private orderService: OrdersService,
    private userService: UsersService,
    private route: ActivatedRoute, public datepipe: DatePipe
  ) { }

  ngOnInit(): void {
    this.updatedBy = parseInt(window.localStorage.getItem('id'));
    this.id = parseInt(this.route.snapshot.paramMap.get('id'));
    this.userService.getUsersDetailsById(this.id).subscribe((data) => {
      this.data = data;
      this.status = this.data.status;
      this.imagepath = this.data.imagepath;
      this.name = this.data.firstName + ' ' + this.data.lastName;
      this.userStatus = this.data.userStatus.userStatus;
    });
    this.isLoading = true;
    this.loadData();
  }

  async loadData() {
    this.orderService.getWaiterOrders(this.id).subscribe((data) => {
      console.log(data);
      this.isLoading = false;
      this.dataSource = data;
      this.dataSource = new MatTableDataSource(this.dataSource);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.total = this.dataSource.data.length;
      this.totalLength = this.dataSource.data.length;
      if (this.total > 100) {
        this.totalLength = [10, 25, 50, 100, this.total];
      } else {
        this.totalLength = [10, 25, 50, 100];
      }
    });
  }

  async changeStatus(status: string) {
    if (status === 'true') {
      this.changingStatus = true;
    } else {
      this.changingStatus = false;
    }
    const user = {
      status: this.changingStatus,
      updatedBy: this.updatedBy,
    };
    this.userService.putUserStatus(this.updatedBy, user).subscribe((resp) => {
      this.loadData();
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getFileName = (name: string) => {
    let timeSpan = new Date().toISOString();
    let sheetName = name || "TableOreder";
    let fileName = `${sheetName}-${timeSpan}`;
    return {
      sheetName,
      fileName
    };
  }

  exportTable() {
    if (this.dataSource.filteredData.length === 0) {
      alert("No data available for ExportData");
    }
    else {
      const dataToExport = this.dataSource.filteredData
        .map(x => ({
          orderId: x.id,
          tableNumber: x.table.tableNumber,
          username: x.waiter.username,
          orderStatus: x.orderStatus.orderStatus,
          amount: x.amount,
          discount: x.discount,
          totalAmount: x.totalAmount,
          date: this.datepipe.transform(x.date, 'yyyy-MM-dd'),
        }));

      let workSheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(dataToExport, <XLSX.Table2SheetOpts>{ sheet: 'Sheet 1' });
      let workBook: XLSX.WorkBook = XLSX.utils.book_new();

      // Adjust column width
      var wscols = [
        { wch: 15 }
      ];

      workSheet["!cols"] = wscols;
      XLSX.utils.book_append_sheet(workBook, workSheet, 'Sheet 1');
      XLSX.writeFile(workBook, `TableOreder.xlsx`);
    }
  }

}
