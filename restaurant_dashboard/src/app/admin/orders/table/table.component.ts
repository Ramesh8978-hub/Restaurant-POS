import { Component, OnInit } from '@angular/core';
import { TablesService } from 'src/app/shared/services/tables.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  tables: any;
  NoOfCards: any;
  isLoading: boolean;
  total: number;
  noData = {
    noDataFound: 'No Data Found',
    image: '/assets/no_data_found.png'
  };
  constructor(private tablesService: TablesService) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.tablesService.getTablesDetails().subscribe(data => {
      this.tables = data;
      this.total = this.tables.length;
      this.NoOfCards = this.tables.length;
      this.isLoading = false;
    });
  }
}
