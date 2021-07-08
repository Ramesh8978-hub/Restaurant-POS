import { environment } from './../../../environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RolesModel } from '../models/roles.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RolesService {
  Url = environment.root;

  private headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private httpClient: HttpClient, private router: Router) { }
  roles: RolesModel[]|any;

  GetRoles(){
    return this.httpClient.get(`${this.Url}/roles`, { headers: this.headers });
  }
}
