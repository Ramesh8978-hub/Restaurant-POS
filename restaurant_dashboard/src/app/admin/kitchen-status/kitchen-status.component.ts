import { MatSnackBar } from '@angular/material/snack-bar';
import { KitchenStatusService } from './../../shared/services/kitchen-status.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { AddKitchenStatusComponent } from './add-kitchen-status/add-kitchen-status.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-kitchen-status',
  templateUrl: './kitchen-status.component.html',
  styleUrls: ['./kitchen-status.component.scss'],
})
export class KitchenStatusComponent implements OnInit {

  isLoading: boolean;
  dataSource;
  data;
  pageIndex: number;
  pageSize: number;
  total: number;
  totalLength = [10];
  id;
  kitchenForm;
  maxall: number = 20;
  displayedColumns: string[] = ['id', 'kitchenStatus', 'username', 'createdAt',  'status'];
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  noData = {
    noDataFound: 'No Data Found',
    image: '/assets/no_data_found.png'
  };
  simpleDialog: MatDialogRef<AddKitchenStatusComponent>;

  constructor(public dialog: MatDialog,
              private snackbar: MatSnackBar,
              private kichenStatusService: KitchenStatusService) { }

  ngOnInit(): void {
    this.ReadKitchenOrdersDetails();
    this.id = parseInt(window.localStorage.getItem('id'));
    this.isLoading = true;
  }
  ReadKitchenOrdersDetails() {
    this.kichenStatusService.getKitchenStatusDetails().subscribe(data => {
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
    this.kichenStatusService.setter(id);
    this.simpleDialog = this.dialog.open(AddKitchenStatusComponent);
    this.simpleDialog.afterClosed().subscribe(res => {
      this.kichenStatusService.onSelectKitchen.next([]);
      this.ReadKitchenOrdersDetails();
    });
  }

  async changeStatus(id: number, status: boolean) {
    if (status === false) {
      status = true;
    }
    else {
      status = false;
    }
    this.kitchenForm = {
      status,
      updatedBy: this.id,
    };
    this.kichenStatusService.updateStatus(id, this.kitchenForm).subscribe(data => {
      this.ReadKitchenOrdersDetails();
    });
  }

  applyFilter(event: string) {
    this.dataSource.filter = event.trim().toLowerCase();
  }

  UpdateKitchenStatus(id: any) {
    this.kichenStatusService.setter(id);
    this.simpleDialog = this.dialog.open(AddKitchenStatusComponent);
    this.simpleDialog.afterClosed().subscribe(res => {
      this.kichenStatusService.onSelectKitchen.next([]);
      this.ReadKitchenOrdersDetails();
    });
  }

  DeleteKitchenStatus(id: number) {
    if (confirm("Are you sure! You want to delete this record?") === true) {
      this.kichenStatusService.deleteKitchenStatus(id).subscribe(data => {
        this.ReadKitchenOrdersDetails();
        this.snackbar.open('KitchenStatus Deleted', 'Ok', {
          duration: 2000
        });
      });
    }
  }
}
