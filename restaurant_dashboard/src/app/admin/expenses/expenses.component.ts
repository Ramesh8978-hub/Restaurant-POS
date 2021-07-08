import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ExpensesTypeService } from 'src/app/shared/services/expenses-type.service';
import { ExpensesService } from 'src/app/shared/services/expenses.service';
import { AddExpensesComponent } from './add-expenses/add-expenses.component';
@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.scss']
})
export class ExpensesComponent implements OnInit {

  displayedColumns: string[] = [
    'id',
    'expenseTypeId',
    'name',
    'discription',
    'amount',
    'employeeId',
    'paymentModeId',
    'createdBy',
    'createdAt',
    'actions',
  ];
  eId: number;
  expensesForm: any;
  expensesData: any;
  id: any;
  isLoading: boolean;
  data;
  dataSource;
  pageIndex: number;
  pageSize: number;
  total: number;
  totalLength = [10];
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  noData = {
    noDataFound: 'No Data Found',
    image: '/assets/no_data_found.png'
  };
  
  categoryForm: { status: boolean; updatedBy: any; };
  categoryService: any;
  simpleDialog: MatDialogRef<AddExpensesComponent> 
  constructor(
    private snackbar: MatSnackBar,
    public dialog: MatDialog,
    private expensesService: ExpensesService,
   
    )
    {
  }
  ngOnInit(): void {

 this.isLoading = true;
    this.id = parseInt(window.localStorage.getItem('id'));
    this.ReadExpensesDetails();
  }
  ReadExpensesDetails() {
    this.expensesService.getExpenses().subscribe(data => {
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
    this.expensesService.setter(id);
    this.simpleDialog = this.dialog.open(AddExpensesComponent,{
    width: '37%'
  });
  this.simpleDialog.afterClosed().subscribe(res => {
    this.expensesService.onSelectexpenses.next([]);
    this.ReadExpensesDetails();
  });
  
  }
 
  applyFilter(event: string) {
    this.dataSource.filter = event.trim().toLowerCase();
  }

  UpdateExpenses(expenses: any) {
    this.expensesService.setter(expenses);
    this.simpleDialog = this.dialog.open(AddExpensesComponent,{
      width: '37%'
    });
    this.simpleDialog.afterClosed().subscribe(res => {
      this.categoryService.onSelectCategory.next([]);
      this.ReadExpensesDetails();
    });
  }
  DeleteExpenses(expenses: any) {
    if (confirm("Are you sure! You want to delete this record?") === true) {
      this.expensesService.deleteExpenses(expenses).subscribe(data => {
        this.ReadExpensesDetails();
        this.snackbar.open('expenses Deleted', 'Error', {
          duration: 2000,
        });
      });
    }
  }
}
