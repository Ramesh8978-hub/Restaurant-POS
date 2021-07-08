import { CategoryModel } from '../models/category.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
   Url = environment.root;
   categorys: CategoryModel | any;
   category: number;
   private headers = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private httpClient: HttpClient, private router: Router) { }

  public onSelectCategory: BehaviorSubject<any> = new BehaviorSubject<any>('');

  postCategory(category: CategoryModel){
    return this.httpClient.post(`${this.Url}/category`, category);
  }
  updateStatus(id: number, category: any) {
    return this.httpClient.put(`${this.Url}/category/${id}`, category);
  }
  putCategory(id: number, category: any) {
    return this.httpClient.put(`${this.Url}/category/${id}`, category);
  }
  getCategoryDetails(){
    return this.httpClient.get(`${this.Url}/category`, { headers: this.headers });
  }
  getCategoryDetailsByStatus(){
    return this.httpClient.get(`${this.Url}/category/status`, { headers: this.headers });
  }

  getCategoryById(id: number){
    return this.httpClient.get(`${this.Url}/category/${id}`, { headers: this.headers });
  }

  deleteCategory(id: number) {
    return this.httpClient.delete(`${this.Url}/category/${id}`, { headers: this.headers } );
  }
  setter(category: number) {
    this.category = category;
  }
  getter(){
    return this.category;
  }
}
