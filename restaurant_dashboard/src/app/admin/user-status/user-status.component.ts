import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserStatusService } from 'src/app/shared/services/user-status.service';
import { AddUserStatusComponent } from './add-user-status/add-user-status.component';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-user-status',
  templateUrl: './user-status.component.html',
  styleUrls: ['./user-status.component.scss']
})
export class UserStatusComponent implements OnInit {

  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  noData = {
    noDataFound: 'No Data Found',
    image: '/assets/no_data_found.png'
  };

  simpleDialog: MatDialogRef<AddUserStatusComponent>;

  constructor(public dialog: MatDialog,
              private snackbar: MatSnackBar,
              private userStatusService: UserStatusService) { }

  isLoading: boolean;
  dataSource;
  data;
  id;
  pageIndex: number;
  pageSize: number;
  total: number;
  totalLength = [10];
  statusForm;
  displayedColumns: string[] = ['id', 'userStatus', 'username', 'createdAt',  'status', ];
  ngOnInit(): void {
    this.id = parseInt(window.localStorage.getItem('id'));
    this.isLoading = true;
    this.ReadStatusDetails();
  }
  ReadStatusDetails() {
    this.userStatusService.getUserStatusDetails().subscribe(data => {
      this.dataSource = data;
      this.isLoading = false;
      this.dataSource = new MatTableDataSource(this.dataSource);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.total = this.dataSource.data.length;
      this.totalLength = this.dataSource.data.length;
      if (this.total > 100) {
        this.totalLength = [ 10, 25, 50, 100, this.total];
      }
      else{
        this.totalLength = [ 10, 25, 50, 100];
      }
    });
  }
  openDialog() {
    const id = undefined;
    this.userStatusService.setter(id);
    this.simpleDialog = this.dialog.open(AddUserStatusComponent);
    this.simpleDialog.afterClosed().subscribe(res => {
      this.userStatusService.onSelectTable.next([]);
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
    this.userStatusService.updateStatus(id, this.statusForm).subscribe(data => {
      this.ReadStatusDetails();
    });
  }

  applyFilter(event: string) {
    this.dataSource.filter = event.trim().toLowerCase();
  }

  UpdateUserStatus(id: any) {
    this.userStatusService.setter(id);
    this.simpleDialog = this.dialog.open(AddUserStatusComponent);
    this.simpleDialog.afterClosed().subscribe(res => {
      this.userStatusService.onSelectTable.next([]);
      this.ReadStatusDetails();
    });
  }

  DeleteStatus(id: number) {
    if (confirm("Are you sure! You want to delete this record?") === true) {
      this.userStatusService.deleteUserStatus(id).subscribe(data => {
        this.ReadStatusDetails();
        this.snackbar.open('UserStatus Deleted', 'Ok', {
          duration: 2000
        });
      });
    }
  }

}
