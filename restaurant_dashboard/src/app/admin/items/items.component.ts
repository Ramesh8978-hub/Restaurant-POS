import { environment } from 'src/environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { CategoryService } from 'src/app/shared/services/category.service';
import { ItemsService } from 'src/app/shared/services/items.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import * as XLSX from 'xlsx';
import 'jspdf-autotable';
import { jsPDF } from 'jspdf';
import { NODATA } from 'node:dns';
@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss'],
  providers: [CategoryService, ItemsService],
})
export class ItemsComponent implements OnInit {
  Url = environment.root;
  isLoading: boolean;
  id: number;
  dataSource;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  displayedColumns: string[] = [
    'sno',
    'image',
    'itemName',
    'category',
    'priority',
    'price',
    'status',
    'id',
  ];

  pageIndex: number;
  pageSize: number;
  totalLength = [10];
  itemForm;
  itemData: any;
  total: number;
  noData = {
    noDataFound: 'No Data Found',
    image: '/assets/no_data_found.png'
  };
  constructor(
    private itemService: ItemsService,
    private snackbar: MatSnackBar,
  ) { }

  ngOnInit() {
    this.id = parseInt(window.localStorage.getItem('id'));
    this.isLoading = true;
    this.loadData();
  }

  async loadData() {
    this.itemService.getItems().subscribe((data) => {
      this.isLoading = false;
      this.itemData = data;
      this.dataSource = this.itemData;
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

  async deleteItemData(id: number) {
    if (confirm("Are you sure! You want to delete this record?") === true) {
      this.itemService.deleteItem(id).subscribe(
        (resp) => {
          this.loadData();
          this.snackbar.open('Item Deleted Successfully', 'Ok', {
            duration: 2000,
          });
        },
        (err) => this.errorHandler(err, 'Items added Failed.')
      );
    }
  }

  async changeStatus(id: number, status: boolean) {
    if (status === false) {
      status = true;
    } else {
      status = false;
    }
    this.itemForm = {
      status,
      updatedBy: this.id,
    };
    this.itemService.updateItemStatus(id, this.itemForm).subscribe((data) => {
      this.loadData();
    });
  }

  private errorHandler(error: any, message: string) {
    this.snackbar.open(message, 'Error', {
      duration: 2000,
    });
  }

  getFileName = (name: string) => {
    let timeSpan = new Date().toISOString();
    let sheetName = name || "ItemsData";
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
          itemName: x.itemName,
          category: x.category.category,
          priority: x.priority,
          price: x.price,
          status: x.status,

        }));

      let workSheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(dataToExport, <XLSX.Table2SheetOpts>{ sheet: 'Sheet 1' });
      let workBook: XLSX.WorkBook = XLSX.utils.book_new();

      // Adjust column width
      var wscols = [
        { wch: 15 }
      ];

      workSheet["!cols"] = wscols;
      XLSX.utils.book_append_sheet(workBook, workSheet, 'Sheet 1');
      XLSX.writeFile(workBook, `ItemsData.xlsx`);
    }
  }

}
