import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { TablesService } from 'src/app/shared/services/tables.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as XLSX from 'xlsx';
import 'jspdf-autotable';
import { jsPDF } from 'jspdf';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-total-table-orders',
  templateUrl: './total-table-orders.component.html',
  styleUrls: ['./total-table-orders.component.scss'],
})
export class TotalTableOrdersComponent implements OnInit {
  isLoading: boolean;
  id: number;
  dataSource;
  displayedColumns: string[] = [
    'sno',
    'id',
    'username',
    'amount',
    'discount',
    'totalAmount',
    'paymentMode',
    'date',
  ];

  pageIndex: number;
  pageSize: number;
  total: number;
  itemForm;
  tableNumber: any;
  totalLength = [10];
  noData = {
    noDataFound: 'No Data Found',
    image: '/assets/no_data_found.png'
  };
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(
    private tablesService: TablesService,
    private route: ActivatedRoute,
    private snackbar: MatSnackBar, public datepipe: DatePipe
  ) { }

  async ngOnInit(): Promise<void> {
    this.id = parseInt(this.route.snapshot.paramMap.get('id'));
    this.tablesService.getTableDataById(this.id).subscribe((data) => {
      this.tableNumber = data;
      this.tableNumber = this.tableNumber;
      this.tableNumber = this.tableNumber.tableNumber;
    });
    this.isLoading = true;
    try {
      await this.loadData();
    } catch (err) {
      this.snackbar.open('Data fetching failed!', 'err', {
        duration: 3000,
      });
    }
  }

  async loadData() {
    this.tablesService
      .getTotalOrdersTablesDetails(this.id)
      .subscribe((data) => {
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

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  getFileName = (name: string) => {
    let timeSpan = new Date().toISOString();
    let sheetName = name || "WaiterOreder";
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
          paymentMode: x.paymentMode.paymentMode,
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
      XLSX.writeFile(workBook, `WaiterOreder.xlsx`);
    }
  }

}
