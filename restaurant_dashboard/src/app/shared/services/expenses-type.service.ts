import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ExpensesTypesModel } from '../models/expenses-types.model';

@Injectable({
  providedIn: 'root'
})
export class ExpensesTypeService {
  expensesType: ExpensesTypesModel | any;
  ExpenseType: number;
  Url = environment.root;
  private headers = new HttpHeaders().set('Content-Type', 'application/json');
  public onSelectexpensesType: BehaviorSubject<any> = new BehaviorSubject<any>('');
  constructor(private httpClient: HttpClient,private router: Router) { }

  
  addExpensesType(expensesType: ExpensesTypesModel){
    return this.httpClient.post(`${this.Url}/expenses-types`, expensesType);
  }
  updateStatus(id: number, expensesType: any) {
    return this.httpClient.put(`${this.Url}/expenses-types/${id}`, expensesType);
  }
  updateExpensesType(id: number, expensesType: any) {
    return this.httpClient.put(`${this.Url}/expenses-types/${id}`, expensesType);
  }
  getExpensesType(){
    return this.httpClient.get(`${this.Url}/expenses-types`, { headers: this.headers });
  }
 
  getExpensesTypeById(id: number){
    return this.httpClient.get(`${this.Url}/expenses-types/${id}`, { headers: this.headers });
  }

  deleteExpensesType(id: number) {
    return this.httpClient.delete(`${this.Url}/expenses-types/${id}`, { headers: this.headers } );
  }
  setter(ExpenseType: number) {
    this.ExpenseType = ExpenseType;
  }
  getter(){
    return this.ExpenseType;
  }
}
