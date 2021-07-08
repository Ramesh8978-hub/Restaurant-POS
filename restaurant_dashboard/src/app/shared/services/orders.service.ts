import { environment } from './../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  Url = environment.root;
  onSelectTables: any;
  orderData: number;
  constructor(private httpClient: HttpClient, private router: Router) { }
  private headers = new HttpHeaders().set('Content-Type', 'application/json');

  updateOrderItems(id: number, order: any) {
    return this.httpClient.put(`${this.Url}/orders-items/${id}`, order);
  }
  postOrder(order: any) {
    return this.httpClient.post(`${this.Url}/orders`, order);
  }
  postOrderItems(items: any) {
    return this.httpClient.post(`${this.Url}/orders-items`, items);
  }
  getOrdersItems() {
    return this.httpClient.get(`${this.Url}/orders-items`);
  }
  getOrders() {
    return this.httpClient.get(`${this.Url}/orders`);
  }
  getPlacedOrders(id: number) {
    return this.httpClient.get(`${this.Url}/orders/tablePlacedOrders/${id}`);
  }
  getOrderItems(id: number) {
    return this.httpClient.get(`${this.Url}/orders/tableOrderItems/${id}`);
  }
  getKitchenOrders(id: number) {
    return this.httpClient.get(`${this.Url}/orders/kitchenOrders/${id}`);
  }

  getWaiterOrders(id: number) {
    return this.httpClient.get(`${this.Url}/orders/waiterOrders/${id}`);
  }
  deleteOdersItems(id: number) {
    return this.httpClient.delete(`${this.Url}/orders-items/${id}`);
  }
  updateQuantity(id: number, order: any) {
    return this.httpClient.put(`${this.Url}/orders-items/updateQuantity/${id}`, order);
  }
  updateOrdersAmount(id: number, order: any) {
    return this.httpClient.put(`${this.Url}/orders/updateAmount/${id}`, order);
  }
  updateOrdersStatus(id: number, order: any) {
    return this.httpClient.put(`${this.Url}/orders/changeOrderStatusComplete/${id}`, order);
  }
  updatePaymentMode(id: number, order: any) {
    return this.httpClient.put(`${this.Url}/orders/changePaymentMode/${id}`, order);
  }
  changeOrderStatusFinish(id: number, order: any) {
    return this.httpClient.put(`${this.Url}/orders/changeOrderStatusFinish/${id}`, order);
  }
  orderReports(fromDate: string, toDate: string) {
    return this.httpClient.post(`${this.Url}/orders/reports`, { fromDate, toDate });
  }
  tableOrderReports(fromDate: string, toDate: string,id:any) {
    return this.httpClient.post(`${this.Url}/orders/table-reports`, { fromDate, toDate,id });
  }
  waiterOrderReports(fromDate: string, toDate: string,id:any) {
    return this.httpClient.post(`${this.Url}/orders/waiter-reports`, { fromDate, toDate,id });
  }
  OrderItemReports(fromDate: string, toDate: string) {
    return this.httpClient.post(`${this.Url}/orders-items/reports`, { fromDate, toDate });
  }
  allReports() {
    return this.httpClient.post(`${this.Url}/orders-items/all-reports`, { headers: this.headers });
  }
  placedAndServedCount() {
    return this.httpClient.post(`${this.Url}/orders/placed-served-count`, { headers: this.headers });
  }
  setter(order: any) {
    this.orderData = order;
    this.getter();
  }
  getter() {
    return this.orderData;
  }
}
