import { FeedbackServicesModel } from './../models/feedback-services.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FeedbackServicesService {

  Url = environment.root;
  feebbackService: FeedbackServicesService[]| any;
  id: number;
  private headers = new HttpHeaders().set('Content-Type', 'application/json');
  public onSelectFeedback: BehaviorSubject<any> = new BehaviorSubject<any>('');
  constructor(private httpClient: HttpClient, private router: Router) { }

  postfeedbackServices(feedback: any){
    return this.httpClient.post(`${this.Url}/feedback-services`, feedback);
  }
  putfeedbackServices(id: number, feedback: any) {
    return this.httpClient.put(`${this.Url}/feedback-services/${id}`, feedback);
  }
  updateStatus(id: number, status: any) {
    return this.httpClient.put(`${this.Url}/feedback-services/${id}`, status);
  }
  getfeedbackServicesDetails(){
    return this.httpClient.get(`${this.Url}/feedback-services`, { headers: this.headers });
  }
  getfeedbackServicesDetailsById(id: number){
    return this.httpClient.get(`${this.Url}/feedback-services/${id}`, { headers: this.headers });
  }
  deletefeedbackServices(id: number) {
    return this.httpClient.delete(`${this.Url}/feedback-services/${id}`, { headers: this.headers } );
  }
  setter(id: any) {
    this.id = id;
  }
  getter(){
    return this.id;
  }
}
