import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  serverURL = environment.root;

  constructor(private httpClient: HttpClient) { }

  getRoles(){
    return this.httpClient.get(`${this.serverURL}/roles`);
  }
  login(admin) {
    return this.httpClient.post(`${this.serverURL}/auth/login`, admin);
  }
  forgotPassword(data: any){
    return this.httpClient.post(`${this.serverURL}/user/forgotPassword`, data);
  }
  MatchOTP(otp: any){
    return this.httpClient.post(`${this.serverURL}/user/matchOTP`, otp);
  }
  SendOTP(email: string){
    return this.httpClient.post(`${this.serverURL}/user/sendOTP`, email);
  }

}
