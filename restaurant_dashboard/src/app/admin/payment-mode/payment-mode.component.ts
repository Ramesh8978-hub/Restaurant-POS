import { MatSnackBar } from '@angular/material/snack-bar';
import { AddPaymentsModeComponent } from './add-payments-mode/add-payments-mode.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { PaymentModeService } from 'src/app/shared/services/payment-mode.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-payment-mode',
  templateUrl: './payment-mode.component.html',
  styleUrls: ['./payment-mode.component.scss'],
})
export class PaymentModeComponent implements OnInit {
  isLoading: boolean;
  dataSource;
  data;
  id;
  paymentForm;
  pageIndex: number;
  pageSize: number;
  total: number;
  totalLength = [10];
  maxall: number = 20;
  displayedColumns: string[] = [
    'id',
    'paymentMode',
    'username',
    'createdAt',
    'status',
    'actions'
    
  ];
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  noData = {
    noDataFound: 'No Data Found',
    image: '/assets/no_data_found.png'
  };
  simpleDialog: MatDialogRef<AddPaymentsModeComponent>;

  constructor(
    public dialog: MatDialog,
    private snackbar: MatSnackBar,
    private paymentsService: PaymentModeService) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.id = parseInt(window.localStorage.getItem('id'));
    this.ReadpaymentsModeDetails();
  }

  ReadpaymentsModeDetails() {
    this.paymentsService.getpaymentsModeDetails().subscribe(data => {
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
    this.paymentsService.setter(id);
    this.simpleDialog = this.dialog.open(AddPaymentsModeComponent);
    this.simpleDialog.afterClosed().subscribe(res => {
      this.paymentsService.onSelectPayment.next([]);
      this.ReadpaymentsModeDetails();
    });
  }

  async changeStatus(id: number, status: boolean) {
    if (status === false){
      status = true;
    }
    else{
      status = false;
    }
    this.paymentForm = {
      status,
      updatedBy: this.id,
    };
    this.paymentsService.updateStatus(id, this.paymentForm).subscribe(data => {
      this.ReadpaymentsModeDetails();
    });
  }

  applyFilter(event: string) {
    this.dataSource.filter = event.trim().toLowerCase();
  }

  UpdatePaymentMode(id: any) {
    this.paymentsService.setter(id);
    this.simpleDialog = this.dialog.open(AddPaymentsModeComponent);
    this.simpleDialog.afterClosed().subscribe(res => {
      this.paymentsService.onSelectPayment.next([]);
      this.ReadpaymentsModeDetails();
    });
  }

  DeletePaymentMode(id: any) {
    if (confirm("Are you sure! You want to delete this record?") === true) {
      this.paymentsService.deletepaymentMode(id).subscribe(data => {
        this.ReadpaymentsModeDetails();
        this.snackbar.open('PaymentMode Deleted', 'Ok', {
          duration: 2000,
        });
      });
    }
  }
}
