import { MatSnackBar } from '@angular/material/snack-bar';
import { TablesModel } from './../../shared/models/tables.model';
import { TablesService } from './../../shared/services/tables.service';
import { AddTablesComponent } from './add-tables/add-tables.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { TableColorService } from 'src/app/shared/Table-color/table-color.service';
import { Router } from '@angular/router';
import { element } from 'protractor';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.scss'],
})
export class TablesComponent implements OnInit {
  tables: TablesModel[] | any;
  simpleDialog: MatDialogRef<AddTablesComponent>;
  tiles: any;
  NoOfCards: number;
  dataSource;
  tableStatus;
  isLoading: boolean;
  data;
  pageIndex: number;
  pageSize: number;

  tableColor: TableColorService;
  total: number;
  noData = {
    noDataFound: 'No Data Found',
    image: '/assets/no_data_found.png'
  };
  constructor(

    public dialog: MatDialog,
    private snackbar: MatSnackBar,
    private tablesService: TablesService,
    private table_Color: TableColorService,
    private router: Router
  ) {
    this.tableColor = table_Color;
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.ReadTablesDetails();
  }

  ReadTablesDetails() {
    this.tablesService.getTablesDetails().subscribe((data) => {
      this.isLoading = false;
      this.tables = data;
      this.NoOfCards = this.tables.length;
      this.total = this.tables.length;

    });
  }

  applyFilter(event: string) {
    this.tables.filter = event.trim().toLowerCase();
  }
  openDialog() {
    const id = undefined;
    this.tablesService.setter(id);
    this.simpleDialog = this.dialog.open(AddTablesComponent);
    this.simpleDialog.afterClosed().subscribe(res => {
      this.tablesService.onSelectTables.next([]);
      this.ReadTablesDetails();
    });
  }

  showTables(status: any, tableId: number) {
    if (status === 'Placed' || status === 'Served' || status === 'Booked') {
      this.router.navigate(['/admin/tables/', tableId]);
    }
  }
  GetTablesData(id: any, status: any) {
    if (status === 'Available' || status === 'Not-Available') {
      this.tablesService.setter(id);
      this.simpleDialog = this.dialog.open(AddTablesComponent);
      this.simpleDialog.afterClosed().subscribe(res => {
        this.tablesService.onSelectTables.next([]);
        this.ReadTablesDetails();
      });
    }
    else {
      Swal.fire("Data should not be Changed")

    }
  }
  DeleteTablesData(table: any, status: any) {
    if (status === 'Available' || status === 'Not-Available') {
      if (confirm("Are you sure! You want to delete this record?") === true) {
        this.tablesService.deleteTables(table).subscribe(data => {
          this.snackbar.open('Table Deleted!', 'Ok', {
            duration: 2000,
          });
          this.ReadTablesDetails();
        });
      }
    }

    else {
      Swal.fire("Data should not be Changed")
    }
  }
}

