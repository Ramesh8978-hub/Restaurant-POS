import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { TablesService } from 'src/app/shared/services/tables.service';

@Component({
  selector: 'app-table-orders',
  templateUrl: './table-orders.component.html',
  styleUrls: ['./table-orders.component.scss']
})
export class TableOrdersComponent implements OnInit {
  isLoading: boolean;
  id: number;
  dataSource;
  displayedColumns: string[] = [
    'id',
    'itemName',
    'price',
    'amount',
    'username'
  ];

  pageIndex: number;
  pageSize: number;
  total: number;
  itemForm;
  tableNumber: any;
  totalLength = [10];


  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(
    private tablesService: TablesService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.id = parseInt(this.route.snapshot.paramMap.get('id'));
    this.tablesService.getTableDataById(this.id).subscribe(data => {
      this.tableNumber = data;
      this.tableNumber = this.tableNumber;
      this.tableNumber = this.tableNumber.tableNumber;
    });
    this.isLoading = true;
    this.loadData();
  }

  async loadData() {
    this.tablesService.getTableOrderItems(this.id).subscribe(data => {
      this.isLoading = false;
      this.dataSource = data;
      this.dataSource = new MatTableDataSource(this.dataSource);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.total = this.dataSource.length;
      this.totalLength = this.dataSource.data.length;
      if (this.total > 100) {
           this.totalLength = [ 10, 25, 50, 100, this.total];
         }
         else{
           this.totalLength = [ 10, 25, 50, 100];
         }
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
