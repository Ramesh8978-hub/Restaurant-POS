import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PaymentsModel } from '../models/payments.model';

@Injectable({
  providedIn: 'root'
})
export class PaymentModeService {
  Url = environment.root;

  payments: PaymentsModel[] | any;
  pay: number;
  private headers = new HttpHeaders().set('Content-Type', 'application/json');
  public onSelectPayment: BehaviorSubject<any> = new BehaviorSubject<any>('');

  constructor(private httpClient: HttpClient, private router: Router) { }
  postPaymentMode(mode: any){
  return this.httpClient.post(`${this.Url}/payment-mode`, mode);
  }
  putPaymentsMode(id: number, mode: any) {
    return this.httpClient.put(`${this.Url}/payment-mode/${id}`, mode);
  }
  updateStatus(id: number, status: any) {
    return this.httpClient.put(`${this.Url}/payment-mode/${id}`, status);
  }
  getpaymentsModeDetails(){
    return this.httpClient.get(`${this.Url}/payment-mode`, { headers: this.headers });
  }
  getpaymentsModeDetailsById(id: number){
    return this.httpClient.get(`${this.Url}/payment-mode/${id}`, { headers: this.headers });
  }
  deletepaymentMode(id: number) {
    return this.httpClient.delete(`${this.Url}/payment-mode/${id}`, { headers: this.headers } );
  }
  setter(pay: any) {
    this.pay = pay;
  }
  getter(){
    return this.pay;
  }
}
