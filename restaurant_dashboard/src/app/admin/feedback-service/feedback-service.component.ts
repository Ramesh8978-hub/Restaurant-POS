import { FeedbackServicesService } from 'src/app/shared/services/feedback-services.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AddFeedbackServiceComponent } from './add-feedback-service/add-feedback-service.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-feedback-service',
  templateUrl: './feedback-service.component.html',
  styleUrls: ['./feedback-service.component.scss']

})
export class FeedbackServiceComponent implements OnInit {
  feedback: any;
  isLoading: boolean;
  dataSource;
  data;
  pageIndex: number;
  pageSize: number;
  total: number;
  totalLength = [10];
  id;
  maxall: number = 20;
  feedbackForm;
  displayedColumns: string[] = ['id', 'question', 'username', 'createdAt', 'status', 'actions'];
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  noData = {
    noDataFound: 'No Data Found',
    image: '/assets/no_data_found.png'
  };
  simpleDialog: MatDialogRef<AddFeedbackServiceComponent>;

  constructor(
    public dialog: MatDialog,
    private snackbar: MatSnackBar,
    private feedbackService: FeedbackServicesService) { }

  ngOnInit(): void {
    this.ReadFeedbackServiceDetails();
    this.id = parseInt(window.localStorage.getItem('id'));
    this.isLoading = true;
  }
  ReadFeedbackServiceDetails() {
    this.feedbackService.getfeedbackServicesDetails().subscribe(data => {
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
    this.feedbackService.setter(id);
    this.simpleDialog = this.dialog.open(AddFeedbackServiceComponent);
    this.simpleDialog.afterClosed().subscribe(res => {
      this.feedbackService.onSelectFeedback.next([]);
      this.ReadFeedbackServiceDetails();
    });
  }
  async changeStatus(id: number, status: boolean) {
    if (status === false) {
      status = true;
    }
    else {
      status = false;
    }
    this.feedbackForm = {
      status,
      updatedBy: this.id,
    };
    this.feedbackService.updateStatus(id, this.feedbackForm).subscribe((data) => {
      this.ReadFeedbackServiceDetails();
    });
  }

  applyFilter(event: string) {
    this.dataSource.filter = event.trim().toLowerCase();
  }

  UpdateFeedBackService(id: any) {
    this.feedbackService.setter(id);
    this.simpleDialog = this.dialog.open(AddFeedbackServiceComponent);
    this.simpleDialog.afterClosed().subscribe(res => {
      this.feedbackService.onSelectFeedback.next([]);
      this.ReadFeedbackServiceDetails();
    });
  }

  DeleteFeedBackService(id: number) {
    if (confirm("Are you sure! You want to delete this record?") === true) {
      this.feedbackService.deletefeedbackServices(id).subscribe(data => {
        this.ReadFeedbackServiceDetails();
        this.snackbar.open('FeedbackService Deleted', 'Ok', {
          duration: 2000
        });
      });
    }
  }
}
