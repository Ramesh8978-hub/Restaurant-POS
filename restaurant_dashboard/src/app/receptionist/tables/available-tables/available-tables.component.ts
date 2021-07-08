import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AddTablesComponent } from 'src/app/admin/tables/add-tables/add-tables.component';
import { TableStatusModel } from 'src/app/shared/models/table-status.model';
import { TablesModel } from 'src/app/shared/models/tables.model';
import { TableStatusService } from 'src/app/shared/services/table-status.service';
import { TablesService } from 'src/app/shared/services/tables.service';
import { TableColorService } from 'src/app/shared/Table-color/table-color.service';

@Component({
  selector: 'app-available-tables',
  templateUrl: './available-tables.component.html',
  styleUrls: ['./available-tables.component.scss']
})
export class AvailableTablesComponent implements OnInit {
  tables: TablesModel[] | any;
  tableStatusData: TableStatusModel[] | any;
  simpleDialog: MatDialogRef<AddTablesComponent>;
  tiles: any;
  NoOfCards: number;
  dataSource;
  isLoading: boolean;
  data;
  dialog: any;
  tablesForm: any;
  userid: number;
  details = [];
  noData = {
    noDataFound: 'No Data Found',
    image: '../assets/no_data_found.png'
  };
  total: number;
  constructor(
    private tableService: TablesService,
    private tableStatusService: TableStatusService,
    private snackbar: MatSnackBar
  ) { }


  ngOnInit(): void {
    this.userid = parseInt(window.localStorage.getItem('id'));
    this.ReadTablesDetails();
    this.tableStatusDetails();

  }
  ReadTablesDetails() {
    this.tableService.getAvailableTables().subscribe((data) => {
      this.tables = data;
      this.NoOfCards = this.tables.length;
      this.isLoading = false;
      this.total = this.tables.length;
    });
  }

  tableStatusDetails() {
    this.tableStatusService.getTablesStatusBookedNotAvailable().subscribe(data => {
      this.tableStatusData = data;
    });
  }

  applyFilter(event: string) {
    this.tables.filter = event.trim().toLowerCase();
  }

  updateStatus(id: any, tableid: any) {
    const table = {
      tableStatusId: id, updatedBy: this.userid
    };
    this.tableService.updateTableStatus(tableid, table).subscribe((data) => {
      if (data) {
        this.snackbar.open(' TablesDetails Updated!', 'Success', {
          duration: 2000,
        });
      }
    });
    this.ReadTablesDetails();
  }

}





