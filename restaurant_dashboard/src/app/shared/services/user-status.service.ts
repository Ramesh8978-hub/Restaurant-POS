import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserStatus } from '../models/user-status.model';

@Injectable({
  providedIn: 'root'
})
export class UserStatusService {

  Url = environment.root;
  tablesStatus: UserStatus[] | any;
  status: number;
   private headers = new HttpHeaders().set('Content-Type', 'application/json');
   public onSelectTable: BehaviorSubject<any> = new BehaviorSubject<any>('');

  constructor(private httpClient: HttpClient, private router: Router) { }

  postUserStatus(status: any){
    return this.httpClient.post(`${this.Url}/user-status`, status);
  }
  putUserStatus(id: number, status: any) {
    return this.httpClient.put(`${this.Url}/user-status/${id}`, status);
  }
  updateStatus(id: number, user: any) {
    return this.httpClient.put(`${this.Url}/user-status/${id}`, user);
  }
  getUserStatusDetails(){
    return this.httpClient.get(`${this.Url}/user-status`, { headers: this.headers });
  }
  getUsersStatusNotAvailable(){
    return this.httpClient.post(`${this.Url}/user-status/not-available`,{ headers: this.headers });
   }
  deleteUserStatus(id: number) {
    return this.httpClient.delete(`${this.Url}/user-status/${id}`, { headers: this.headers } );
  }
  getUserStatusDetailsById(id: number){
    return this.httpClient.get(`${this.Url}/user-status/${id}`, { headers: this.headers });
  }
  setter(status: any) {
    this.status = status;
  }
  getter(){
    return this.status;
  }
}
