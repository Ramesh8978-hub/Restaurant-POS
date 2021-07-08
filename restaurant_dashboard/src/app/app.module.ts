import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from './shared/material/material.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { OrderModule } from 'ngx-order-pipe';
import { OrderReportsComponent } from './shared/reports/order-reports/order-reports.component';
import { ItemReportsComponent } from './shared/reports/item-reports/item-reports.component';
import { CategoryReportsComponent } from './shared/reports/category-reports/category-reports.component';
import { TableReportsComponent } from './shared/reports/table-reports/table-reports.component';
import { WaiterReportsComponent } from './shared/reports/waiter-reports/waiter-reports.component';
import { ExpensesReportsComponent } from './shared/reports/expenses-reports/expenses-reports.component';

@NgModule({
  declarations: [
    AppComponent,
    ForgotPasswordComponent,
    PageNotFoundComponent,
    OrderReportsComponent,
    ItemReportsComponent,
    CategoryReportsComponent,
    TableReportsComponent,
    WaiterReportsComponent,
    ExpensesReportsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    OrderModule 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
