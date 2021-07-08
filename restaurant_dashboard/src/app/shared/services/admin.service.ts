import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  serverUrl = environment.root;
  constructor(private httpClient: HttpClient) { }

  getAdminData(id: number){
    return this.httpClient.get(`${this.serverUrl}/user/profile/${id}`);
  }
}
