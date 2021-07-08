import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TablesModel } from '../models/tables.model';

@Injectable({
  providedIn: 'root'
})
export class TablesService {
  Url = environment.root;
  tables: TablesModel[] | any;
  tableData: number;
  private headers = new HttpHeaders().set('Content-Type', 'application/json');
  public onSelectTables: BehaviorSubject<any> = new BehaviorSubject<any>('');

  constructor(private httpClient: HttpClient, private router: Router) { }

  postTables(table: any) {
    return this.httpClient.post(`${this.Url}/tables`, table);
  }
  putTables(id: number, table: any) {
    return this.httpClient.put(`${this.Url}/tables/${id}`, table);
  }
  updateTableStatus(id: number, table: any) {
    return this.httpClient.put(`${this.Url}/tables/updateTableStatus/${id}`, table);
  }
  updateStatus(id: number, table: any) {
    return this.httpClient.put(`${this.Url}/tables/${id}`, table);
  }
  getTablesDetails() {
    return this.httpClient.get(`${this.Url}/tables`, { headers: this.headers });
  }
  getTableDataById(id: number) {
    return this.httpClient.get(`${this.Url}/tables/${id}`, { headers: this.headers });
  }
  getAvailableTables() {
    return this.httpClient.get(`${this.Url}/tables/available`, { headers: this.headers });
  }
  getAvailableAndBookedTables() {
    return this.httpClient.get(`${this.Url}/tables/availableAndBooked`, { headers: this.headers });
  }
  getServedTables() {
    return this.httpClient.get(`${this.Url}/tables/served-tables`);
  }
  deleteTables(id: number) {
    return this.httpClient.delete(`${this.Url}/tables/${id}`, { headers: this.headers });
  }
  getTableStatus() {
    return this.httpClient.get(`${this.Url}/table-status`, { headers: this.headers });
  }
  getTableOrderItems(id: number) {
    return this.httpClient.get(`${this.Url}/orders/tableOrderItems/${id}`, { headers: this.headers });
  }
  getTotalOrdersTablesDetails(id: number) {
    return this.httpClient.get(`${this.Url}/orders/tableOrders/${id}`, { headers: this.headers });
  }

  setter(table: any) {
    this.tableData = table;
  }
  getter() {
    return this.tableData;
  }
}
