import { OrdersStatusModel } from './../models/orders-status.model';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderStatusService {
Url = environment.root;

orderstatus: OrdersStatusModel[] | any;
id: number;
private headers = new HttpHeaders().set('Content-Type', 'application/json');
public onSelectOrder: BehaviorSubject<any> = new BehaviorSubject<any>('');

constructor(private httpClient: HttpClient, private router: Router) { }

postOrdersStatus(orders: any){
return this.httpClient.post(`${this.Url}/order-status`, orders);
}
putOrdersStatus(id: number, status: any) {
  return this.httpClient.put(`${this.Url}/order-status/${id}`, status);
}
updateStatus(id: number, status: any) {
  return this.httpClient.put(`${this.Url}/order-status/${id}`, status);
}
getOrdersStatusDetails(){
  return this.httpClient.get(`${this.Url}/order-status`, { headers: this.headers });
}
getOrdersStatusDetailsById(id: number){
  return this.httpClient.get(`${this.Url}/order-status/${id}`, { headers: this.headers });
}
deleteOrdersStatus(id: number) {
  return this.httpClient.delete(`${this.Url}/order-status/${id}`, { headers: this.headers } );
}
setter(id: any) {
  this.id = id;
}
getter(){
  return this.id;
}
}
