import { TableStatusModel } from './../models/table-status.model';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TableStatusService {

  Url = environment.root;
  tablesStatus: TableStatusModel[] | any;
  status: number;
   private headers = new HttpHeaders().set('Content-Type', 'application/json');
   public onSelectTable: BehaviorSubject<any> = new BehaviorSubject<any>('');

  constructor(private httpClient: HttpClient, private router: Router) { }

  postTableStatus(status: any){
    return this.httpClient.post(`${this.Url}/table-status`, status);
  }
  putTablesStatus(id: number, status: any) {
    return this.httpClient.put(`${this.Url}/table-status/${id}`, status);
  }
  updateStatus(id: number, table: any) {
    return this.httpClient.put(`${this.Url}/table-status/${id}`, table);
  }
  getTablesStatusDetails(){
    return this.httpClient.get(`${this.Url}/table-status`, { headers: this.headers });
  }
  deleteTablesStatus(id: number) {
    return this.httpClient.delete(`${this.Url}/table-status/${id}`, { headers: this.headers } );
  }
  getTablesStatusDetailsById(id: number){
    return this.httpClient.get(`${this.Url}/table-status/${id}`, { headers: this.headers });
  }
  getTablesStatusBookedNotAvailable(){
    return this.httpClient.get(`${this.Url}/table-status/booked&not-available`, { headers: this.headers });
  }
  getTablesStatusAvailable(){
    return this.httpClient.get(`${this.Url}/table-status/available`, { headers: this.headers });
  }
  setter(status: any) {
    this.status = status;
  }
  getter(){
    return this.status;
  }


}
