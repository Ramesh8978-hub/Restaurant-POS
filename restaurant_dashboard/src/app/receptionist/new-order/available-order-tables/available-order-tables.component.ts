import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { TableStatusModel } from 'src/app/shared/models/table-status.model';
import { TablesModel } from 'src/app/shared/models/tables.model';
import { OrdersService } from 'src/app/shared/services/orders.service';
import { TableStatusService } from 'src/app/shared/services/table-status.service';
import { TablesService } from 'src/app/shared/services/tables.service';
import { TableColorService } from 'src/app/shared/Table-color/table-color.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-available-order-tables',
  templateUrl: './available-order-tables.component.html',
  styleUrls: ['./available-order-tables.component.scss']
})
export class AvailableOrderTablesComponent implements OnInit {
  isLoading: boolean;
  tables = [];
  tabledata: any;
  colorService: TableColorService;
  total:number;
  userid: number;
  tableStatusData: TableStatusModel[] | any;

  noData = {
    noDataFound: 'No Data Found',
    image: '/assets/no_data_found.png'
  };
  constructor(
    private tableService: TablesService,
    private table_color: TableColorService,
    private tableStatusService: TableStatusService,
    private snackbar: MatSnackBar,
    private router:Router,
    private orderService: OrdersService,

    ) {
    this.colorService = table_color;
  }

  ngOnInit(): void {
    this.userid = parseInt(window.localStorage.getItem('id'));
    this.ReadTablesDetails();
    // this.tableStatusDetails();
  }

  ReadTablesDetails() {
    this.tableService.getTablesDetails().subscribe(data => {
      this.tabledata = data;
      // this.tabledata.map(e => {
      //   if (e.tableStatus.tableStatus == "Booked" || e.tableStatus.tableStatus == "Not-Available") {
      //     this.tableStatusService.getTablesStatusAvailable().subscribe(data => {
      //       this.tableStatusData = data;
      //     });
      //   }
      //   else {
      //     this.tableStatusService.getTablesStatusBookedNotAvailable().subscribe(data => {
      //       this.tableStatusData = data;
      //     });
      //   }
      // })
      this.total = this.tabledata.length
      this.isLoading = false;
    });
  }
  tableStatusDetails(status: string) {
    if (status == "Booked" || status == "Not-Available") {
      this.tableStatusService.getTablesStatusAvailable().subscribe(data => {
        this.tableStatusData = data;
      });
    }
    else {
      this.tableStatusService.getTablesStatusBookedNotAvailable().subscribe(data => {
        this.tableStatusData = data;
      });
    }
  }
  updateStatus(id: any, tableid: any,tableStatus:string) {
    console.log(tableStatus);
    if (tableStatus === 'Placed' || tableStatus === 'Served') {
      Swal.fire("This table status can't be update")
    }
    else{
      const table = {
        tableStatusId: id, updatedBy: this.userid
      };
      this.tableService.updateTableStatus(tableid, table).subscribe((data) => {
        this.ReadTablesDetails();
        if (data) {
          this.snackbar.open(' TablesDetails Updated!', 'Success', {
            duration: 2000,
          });
        }
      });
    }
  }
  tableOrderItems(id:number,tableStatus:string){
    if (tableStatus === 'Placed' || tableStatus === 'Served') {
      this.orderService.setter(id);
      this.router.navigate([`/Receptionist/orders/${id}`])
    }
    else if (tableStatus === 'Available' || tableStatus === 'Booked') {
      this.router.navigate([`Receptionist/newOrder/${id}`])
    }
  }

  // ReadTablesDetails() {
  //   this.tableService.getAvailableAndBookedTables().subscribe(data => {
  //     this.tabledata = data;
  //     this.tabledata[0].map(data => {
  //       this.tables.push(data);
  //     });
  //     this.tabledata[1].map(data => {
  //       this.tables.push(data);
  //     });
  //     this.isLoading = false;
  //   });
  // }
}
