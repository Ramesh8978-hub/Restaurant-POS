import { TableStatusService } from 'src/app/shared/services/table-status.service';
import { AddStatusComponent } from './add-status/add-status.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-table-status',
  templateUrl: './table-status.component.html',
  styleUrls: ['./table-status.component.scss'],
})
export class TableStatusComponent implements OnInit {
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  noData = {
    noDataFound: 'No Data Found',
    image: '/assets/no_data_found.png'
  };

  simpleDialog: MatDialogRef<AddStatusComponent>;

  constructor(public dialog: MatDialog,
    private snackbar: MatSnackBar,
    private tableStatusService: TableStatusService) { }

  isLoading: boolean;
  dataSource;
  data;
  id;
  pageIndex: number;
  pageSize: number;
  total: number;
  totalLength = [10];
  statusForm;
  maxall: number = 20;
  displayedColumns: string[] = ['id', 'tableStatus', 'username', 'createdAt', 'status'];

  ngOnInit(): void {
    this.id = parseInt(window.localStorage.getItem('id'));
    this.isLoading = true;
    this.ReadStatusDetails();
  }

  ReadStatusDetails() {
    this.tableStatusService.getTablesStatusDetails().subscribe(data => {
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
    this.tableStatusService.setter(id);
    this.simpleDialog = this.dialog.open(AddStatusComponent);
    this.simpleDialog.afterClosed().subscribe(res => {
      this.tableStatusService.onSelectTable.next([]);
      this.ReadStatusDetails();
    });
  }

  async changeStatus(id: number, status: boolean) {
    if (status === false) {
      status = true;
    }
    else {
      status = false;
    }
    this.statusForm = {
      status,
      updatedBy: this.id,
    };
    this.tableStatusService.updateStatus(id, this.statusForm).subscribe(data => {
      this.ReadStatusDetails();
    });
  }

  applyFilter(event: string) {
    this.dataSource.filter = event.trim().toLowerCase();
  }

  UpdateTableStatus(id: any) {
    this.tableStatusService.setter(id);
    this.simpleDialog = this.dialog.open(AddStatusComponent);
    this.simpleDialog.afterClosed().subscribe(res => {
      this.tableStatusService.onSelectTable.next([]);
      this.ReadStatusDetails();
    });
  }

  DeleteStatus(id: number) {
    if (confirm("Are you sure! You want to delete this record?") === true) {
      this.tableStatusService.deleteTablesStatus(id).subscribe(data => {
        this.ReadStatusDetails();
        this.snackbar.open('TableStatus Deleted', 'Ok', {
          duration: 2000
        });
      });
    }
  }
}
