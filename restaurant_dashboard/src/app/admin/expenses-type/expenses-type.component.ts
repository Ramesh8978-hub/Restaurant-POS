import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ExpensesTypeService } from 'src/app/shared/services/expenses-type.service';
import { AddExpensesTypeComponent } from './add-expenses-type/add-expenses-type.component';

@Component({
  selector: 'app-expenses-type',
  templateUrl: './expenses-type.component.html',
  styleUrls: ['./expenses-type.component.scss']
})
export class ExpensesTypeComponent implements OnInit {

  displayedColumns: string[] = [
    'id',
    'type',
    'createdAt',
    'status',
    'actions',
  ];
  isLoading!: boolean;
  data: any;
  id: number;
  dataSource: any;
  pageIndex!: number;
  pageSize!: number;
  total!: number;
  totalLength = [10, 25, 50, 100];
  simpleDialog: MatDialogRef<AddExpensesTypeComponent>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  expensesTypeForm: any;
  noData = {
    noDataFound: 'No Data Found',
    image: '/assets/no_data_found.png'
  };
  constructor(private expenseTypeService: ExpensesTypeService,
    public dialog: MatDialog,
    private snackbar: MatSnackBar) { }

  ngOnInit(): void {
    this.id = parseInt(window.localStorage.getItem('id'));
    this.ReadExpensesTypeDetails();
  }
  openDialog() {
    const id = undefined;
    this.expenseTypeService.setter(id);
    this.simpleDialog = this.dialog.open(AddExpensesTypeComponent, {
      width: '20%'
    });
    this.simpleDialog.afterClosed().subscribe(res => {
      this.expenseTypeService.onSelectexpensesType.next([]);
      this.ReadExpensesTypeDetails();
    });
  }
  ReadExpensesTypeDetails() {
    this.expenseTypeService.getExpensesType().subscribe(data => {
      this.dataSource = data;
      this.isLoading = false;
      this.dataSource = new MatTableDataSource(this.dataSource);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.total = this.dataSource.data.length;

    });
  }
  applyFilter(event: any) {
    this.dataSource.filter = event.target.value.trim().toLowerCase();
  }

  async changeStatus(id: number, status: boolean) {

    if (status === false) {
    status = true;
    }
    else {
      status = false;
    }
    this.expensesTypeForm = {
      status,
      updatedBy: this.id,
    };
    this.expenseTypeService.updateExpensesType(id, this.expensesTypeForm).subscribe(data => {
      this.ReadExpensesTypeDetails();
    });
  }
  updateExpensesData(exType: any) {
    console.log(exType);
    
    this.expenseTypeService.setter(exType);
    this.simpleDialog = this.dialog.open(AddExpensesTypeComponent, {
      width: '20%'
    });
    this.simpleDialog.afterClosed().subscribe(res => {
      this.expenseTypeService.onSelectexpensesType.next([]);
      this.ReadExpensesTypeDetails();
    });
  }
  deleteExpensesData(exType: any) {
    if (confirm("Are you sure! You want to delete this record?") === true) {
      this.expenseTypeService.deleteExpensesType(exType).subscribe(data => {
        this.ReadExpensesTypeDetails();
        this.snackbar.open('ExpensesType Deleted', 'Error', {
          duration: 2000,
        });
      });
    }
  }
}
