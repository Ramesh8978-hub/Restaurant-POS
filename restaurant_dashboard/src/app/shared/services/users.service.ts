import { UserModel } from './../models/users.model';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  Url = environment.root;
  users: UserModel[] | any;
  userId: number;
  private headers = new HttpHeaders().set('Content-Type', 'application/json');
  onSelectTables: any;

  constructor(private httpClient: HttpClient, private router: Router) { }

  postUsers(user: any) {
    return this.httpClient.post(`${this.Url}/user`, user);
  }
  getUserStatus(id: number) {
    return this.httpClient.get(`${this.Url}/user-status/${id}`);
  }
  getUsersStatus() {
    return this.httpClient.get(`${this.Url}/user-status`);
  }
  putUsers(id: number, users: any) {
    return this.httpClient.put(`${this.Url}/user/${id}`, users);
  }
  updateStatus(id: number, user: any) {
    return this.httpClient.put(`${this.Url}/user/${id}`, user);
  }
  updateUserStatus(id: number, user: any) {
    return this.httpClient.put(`${this.Url}/user/updateUserStatus/${id}`, user);
  }
  updateImage(id: number, files: any) {
    return this.httpClient.put(`${this.Url}/user/image/${id}`, files);
  }
  putUserStatus(id: number, user: any) {
    return this.httpClient.put(`${this.Url}/user/${id}`, user);
  }
  getUsersDetails() {
    return this.httpClient.get(`${this.Url}/user`, { headers: this.headers });
  }
  getWaiterDetails() {
    return this.httpClient.post(`${this.Url}/user/waiterDetails`, { headers: this.headers });
  }
  getKitchenDetails() {
    return this.httpClient.post(`${this.Url}/user/kitchenDetails`, { headers: this.headers });
  }
  getUsersDetailsById(id: number) {
    return this.httpClient.get(`${this.Url}/user/profile/${id}`, { headers: this.headers });
  }
  deleteUsers(id: number) {
    return this.httpClient.delete(`${this.Url}/user/${id}`, { headers: this.headers });
  }
  getAvailableWaiters() {
    return this.httpClient.post(`${this.Url}/user/availableWaiters`, { headers: this.headers });
  }
  changePassword(id: number, user: any) {
    return this.httpClient.put(`${this.Url}/user/changePassword/${id}`, user);
  }
  getWaitersAndReceptionist() {
    return this.httpClient.post(`${this.Url}/user/waitersAndReceptionist`, { headers: this.headers });
  }
  setter(userId: any) {
    this.userId = userId;
  }
  getter() {
    return this.userId;
  }
}
