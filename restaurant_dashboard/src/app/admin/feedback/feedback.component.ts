import { FeedbackService } from './../../shared/services/feedback.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.scss'],
})
export class FeedbackComponent implements OnInit {
  isLoading: boolean;
  dataSource;
  data;
  pageIndex: number;
  pageSize: number;
  total: number;
  totalLength = [10];
  displayedColumns: string[] = [
    'id',
    'waiterId',
    'customerName',
    'question',
    'feedback',
  ];

  constructor(private feedbackService: FeedbackService) {}
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  noData = {
    noDataFound: 'No Data Found',
    image: '/assets/no_data_found.png'
  };
  ngOnInit(): void {
    this.isLoading = true;
    this.ReadFeedbackDetails();
  }

  ReadFeedbackDetails() {
    this.feedbackService.getFeedbackDetails().subscribe((data) => {
      this.dataSource = data;
      this.isLoading = false;
      this.dataSource = new MatTableDataSource(this.dataSource);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.total = this.dataSource.data.length;
      this.totalLength = this.dataSource.data.length;
      if (this.total > 100) {
        this.totalLength = [10, 25, 50, 100, this.total];
      } else {
        this.totalLength = [10, 25, 50, 100];
      }
    });
  }

  applyFilter(event: string) {
    this.dataSource.filter = event.trim().toLowerCase();
  }
}
