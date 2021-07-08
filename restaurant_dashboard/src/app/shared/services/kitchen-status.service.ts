import { KitchenStatusModel } from './../models/kitchen-status.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class KitchenStatusService {
  Url = environment.root;
  kitchenStatus: KitchenStatusModel[]| any;
  id: number;
  private headers = new HttpHeaders().set('Content-Type', 'application/json');
  public onSelectKitchen: BehaviorSubject<any> = new BehaviorSubject<any>('');

  constructor(private httpClient: HttpClient, private router: Router) { }

  postKitchenStatus(kitchen: any){
    return this.httpClient.post(`${this.Url}/kitchen-status`, kitchen);
  }
  putKitchenStatus(id: number, kitchen: any) {
    return this.httpClient.put(`${this.Url}/kitchen-status/${id}`, kitchen);
  }
  updateStatus(id: number, status: any) {
    return this.httpClient.put(`${this.Url}/kitchen-status/${id}`, status);
  }
  getKitchenStatusDetails(){
    return this.httpClient.get(`${this.Url}/kitchen-status`, { headers: this.headers });
  }
  getKitchenStatusDetailsById(id: number){
    return this.httpClient.get(`${this.Url}/kitchen-status/${id}`, { headers: this.headers });
  }
  deleteKitchenStatus(id: number) {
    return this.httpClient.delete(`${this.Url}/kitchen-status/${id}`, { headers: this.headers } );
  }
  setter(id: any) {
    this.id = id;
  }
  getter(){
    return this.id;
  }
}
