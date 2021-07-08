import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { OrderStatusService } from 'src/app/shared/services/order-status.service';
import { OrdersService } from 'src/app/shared/services/orders.service';
import * as XLSX from 'xlsx';
import 'jspdf-autotable';
import { jsPDF } from 'jspdf';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
  providers: [OrdersService]
})
export class OrdersComponent implements OnInit {
  isLoading: boolean;
  displayedColumns: string[] = ['id', 'tableNumber', 'username', 'orderStatus', 'amount', 'discount', 'totalAmount', 'date'];

  dataSource;
  data;
  pageIndex: number;
  pageSize: number;
  total: number;
  totalLength = [10];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  orderstatusData: any;
  ordersData: any;
  orderStatusValue: any;
  orderStatus = [];
  noData = {
    noDataFound: 'No Data Found',
    image: '/assets/no_data_found.png'
  };

  constructor(
    private orderService: OrdersService,
    private orderStatusService: OrderStatusService, public datepipe: DatePipe

  ) { }

  ngOnInit(): void {
    this.isLoading = false;
    this.orderStatusService.getOrdersStatusDetails().subscribe((data) => {
      this.orderstatusData = data;
      this.loadData();
    });
  }
  async loadData() {
    this.orderService.getOrders().subscribe(data => {
      this.isLoading = false;
      this.dataSource = data;
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
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  Change(event) {
    this.orderService.getOrders().subscribe(data => {
      this.ordersData = data;
      this.orderStatus = [];
      for (let StatusValue of this.ordersData) {
        let order = StatusValue.orderStatus.orderStatus
        if (event.source.value === 'All' || event.source.value === null) {
          this.orderStatus.push(StatusValue);
        }
        else if (event.source.value === order) {
          this.orderStatus.push(StatusValue);
        }

        StatusValue++
      }

      this.dataSource = new MatTableDataSource(this.orderStatus);
      this.isLoading = false;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.total = this.dataSource.length;
      this.totalLength = this.dataSource.length;
      if (this.total > 100) {
        this.totalLength = [10, 25, 50, 100, this.total];
      }
      else {
        this.totalLength = [10, 25, 50, 100];
      }

    })

  }
  getFileName = (name: string) => {
    let timeSpan = new Date().toISOString();
    let sheetName = name || "Oreders";
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
      XLSX.writeFile(workBook, `Oreders.xlsx`);
    }
  }

}
