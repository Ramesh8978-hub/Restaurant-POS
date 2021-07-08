import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryService } from './../../shared/services/category.service';
import { AddCategoryComponent } from './add-category/add-category.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import * as XLSX from 'xlsx';
import 'jspdf-autotable';
import { jsPDF } from 'jspdf';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'category',
    'createdBy',
    'createdAt',
    'status',
    'actions',
  ];
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  simpleDialog: MatDialogRef<AddCategoryComponent>;
  isLoading: boolean;
  data;
  id: number;
  dataSource;
  pageIndex: number;
  pageSize: number;
  total: number;
  totalLength = [10];
  noData = {
    noDataFound: 'No Data Found',
    image: '/assets/no_data_found.png'
  };
  categoryForm;
  constructor(
    public dialog: MatDialog,
    private snackbar: MatSnackBar,
    private categoryService: CategoryService, public datepipe: DatePipe
  ) { }
  ngOnInit(): void {
    this.isLoading = true;
    this.id = parseInt(window.localStorage.getItem('id'));
    this.ReadCategoryDetails();
  }
  ReadCategoryDetails() {
    this.categoryService.getCategoryDetails().subscribe(data => {
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
    this.categoryService.setter(id);
    this.simpleDialog = this.dialog.open(AddCategoryComponent);
    this.simpleDialog.afterClosed().subscribe(res => {
      this.categoryService.onSelectCategory.next([]);
      this.ReadCategoryDetails();
    });
  }
  async changeStatus(id: number, status: boolean) {
    if (status === false) {
      status = true;
    } else {
      status = false;
    }
    this.categoryForm = {
      status,
      updatedBy: this.id,
    };
    this.categoryService.updateStatus(id, this.categoryForm).subscribe(data => {
      this.ReadCategoryDetails();
    });
  }

  applyFilter(event: string) {
    this.dataSource.filter = event.trim().toLowerCase();
  }

  UpdateCategorys(category: any) {
    this.categoryService.setter(category);
    this.simpleDialog = this.dialog.open(AddCategoryComponent);
    this.simpleDialog.afterClosed().subscribe(res => {
      this.categoryService.onSelectCategory.next([]);
      this.ReadCategoryDetails();
    });
  }
  DeleteCategorys(category: any) {
    if (confirm("Are you sure! You want to delete this record?") === true) {
      this.categoryService.deleteCategory(category).subscribe(data => {
        this.ReadCategoryDetails();
        this.snackbar.open('Category Deleted', 'Error', {
          duration: 2000,
        });
      });
    }
  }
  getFileName = (name: string) => {
    let timeSpan = new Date().toISOString();
    let sheetName = name || "CategoryData";
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
          category: x.category,
          createdBy: x.createdBy.username,
          createdAt: this.datepipe.transform(x.createdAt, 'yyyy-MM-dd'),
          status: x.status

        }));

      let workSheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(dataToExport, <XLSX.Table2SheetOpts>{ sheet: 'Sheet 1' });
      let workBook: XLSX.WorkBook = XLSX.utils.book_new();

      // Adjust column width
      var wscols = [
        { wch: 15 }
      ];

      workSheet["!cols"] = wscols;
      XLSX.utils.book_append_sheet(workBook, workSheet, 'Sheet 1');
      XLSX.writeFile(workBook, `CategoryData.xlsx`);
    }
  }
}


