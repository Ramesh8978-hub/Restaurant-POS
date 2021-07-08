import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { RolesService } from 'src/app/shared/services/roles.service';
import { UserStatusService } from 'src/app/shared/services/user-status.service';
import { UsersService } from 'src/app/shared/services/users.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-available-waiters',
  templateUrl: './available-waiters.component.html',
  styleUrls: ['./available-waiters.component.scss'],
})
export class AvailableWaitersComponent implements OnInit {
  Url = environment.root;
  isLoading: boolean;
  dataSource;
  data;
  id;
  roles;
  pageIndex: number;
  pageSize: number;
  total = 0;
  usersForm;
  totalLength = [10, 50, 100];
  userStatusData: any;

  displayedColumns: string[] = [
    'id',
    'imagepath',
    'firstName',
    'lastName',
    'username',
    'mobileNo',
    'email',
    'userStatus',
    'actions',
  ];
  noData = {
    noDataFound: 'No Data Found',
    image: '../assets/no_data_found.png'
  };
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private userStatusService: UserStatusService,
    private userService: UsersService,
    private router: Router,
    private snackbar: MatSnackBar,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.id = parseInt(window.localStorage.getItem('id'));
    this.ReadUsersDetails();
    this.ReadUsersStatusDetails();
    this.isLoading = true;
  }
  ReadUsersDetails() {
    this.userService.getAvailableWaiters().subscribe((data) => {
      this.dataSource = data;
      this.isLoading = false;
      this.dataSource = new MatTableDataSource(this.dataSource);
      this.total = this.dataSource.data.length;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      if (this.total > 100) {
        this.totalLength = [10, 50, 100, this.total];
      } else {
        this.totalLength = [10, 50, 100];
      }
    });
  }
  ReadUsersStatusDetails() {
    this.userStatusService.getUsersStatusNotAvailable().subscribe((data) => {
      this.userStatusData = data;
    });
  }
  applyFilter(event: string) {
    this.dataSource.filter = event.trim().toLowerCase();
  }
  updateStatus(userStatusId: any, tableid: any) {
    let userStatus = {
      userStatusId: userStatusId,
      updatedBy: this.id,
    };
    this.userService.updateUserStatus(tableid, userStatus).subscribe((data) => {
      if (data) {
        this.snackbar.open(' UserDetails Updated!', 'Success', {
          duration: 2000,
        });
      }
    });
    this.ReadUsersDetails();
  }
}
