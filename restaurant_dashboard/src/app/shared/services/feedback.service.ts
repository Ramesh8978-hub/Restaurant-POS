import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  Url = environment.root;
  feebbackService: FeedbackService[]| any;
  private headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private httpClient: HttpClient, private router: Router) { }

  getFeedbackDetails(){
    return this.httpClient.get(`${this.Url}/feedback`, { headers: this.headers });
  }
}
