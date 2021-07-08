import { TableColorService } from './../../../shared/Table-color/table-color.service';
import { Component, OnInit } from '@angular/core';
import { TablesModel } from 'src/app/shared/models/tables.model';
import { TablesService } from 'src/app/shared/services/tables.service';

@Component({
  selector: 'app-available-tables',
  templateUrl: './available-tables.component.html',
  styleUrls: ['./available-tables.component.scss']
})
export class AvailableTablesComponent implements OnInit {

  tables: TablesModel[] | any;
  tableColor: TableColorService;
  isLoading: boolean;
  total: number;
  noData = {
    noDataFound: 'No Data Found',
    image: '/assets/no_data_found.png'
  };
  constructor(
    private tableService: TablesService,
    private table_Color: TableColorService
    ) {
      this.tableColor = table_Color;
     }

  ngOnInit(): void {
    this.isLoading = true;
    this.tableService.getAvailableTables().subscribe(data => {
      this.tables = data;
      this.isLoading = false;
      this.total = this.tables.length;
    });
  }

}
