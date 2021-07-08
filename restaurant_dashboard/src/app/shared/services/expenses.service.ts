import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ExpensesModel } from '../models/expenses.model';

@Injectable({
  providedIn: 'root'
})
export class ExpensesService {
  expenses: ExpensesModel | any;
  Expenses: number;
  Url = environment.root;
  private headers = new HttpHeaders().set('Content-Type', 'application/json');
  public onSelectexpenses: BehaviorSubject<any> = new BehaviorSubject<any>('');
  constructor(private httpClient: HttpClient,private router: Router) { }

  Reports(fromDate: string, toDate: string) {
    return this.httpClient.post(`${this.Url}/expenses/reports`, { fromDate, toDate });
  }
  addExpenses(expenses: ExpensesModel){
    return this.httpClient.post(`${this.Url}/expenses`, expenses);
  }
  updateStatus(id: number, expenses: any) {
    return this.httpClient.put(`${this.Url}/expenses/${id}`, expenses);
  }
  updateExpenses(id: number, expenses: any) {
    return this.httpClient.put(`${this.Url}/expenses/${id}`, expenses);
  }
  getExpenses(){
    return this.httpClient.get(`${this.Url}/expenses`, { headers: this.headers });
  }
 
  getExpensesById(id: number){
    return this.httpClient.get(`${this.Url}/expenses/${id}`, { headers: this.headers });
  }

  deleteExpenses(id: number) {
    return this.httpClient.delete(`${this.Url}/expenses/${id}`, { headers: this.headers } );
  }
  ExpenseReports(fromDate: string, toDate: string) {
    return this.httpClient.post(`${this.Url}/expenses/reports`, { fromDate, toDate });
  }
  setter(Expenses: number) {
    this.Expenses = Expenses;
  }
  getter(){
    return this.Expenses;
  }
}
