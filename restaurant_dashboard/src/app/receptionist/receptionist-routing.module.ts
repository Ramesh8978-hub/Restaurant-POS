import { AllOrdersComponent } from './all-orders/all-orders.component';
import { NewOrderItemComponent } from './orders/new-order-item/new-order-item.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AvailableWaitersComponent } from '../receptionist/available-waiters/available-waiters.component';
import { ReceptionistAuthGuardService } from '../auth/core/services/receptionist.auth-guard.service';
import { OrdersComponent } from './orders/orders.component';
import { OverviewComponent } from './overview/overview.component';
import { ReceptionistComponent } from './receptionist.component';
import { NewOrderComponent } from './new-order/new-order.component';

import { ProfileComponent } from './profile/profile.component';
import { AvailableTablesComponent } from '../receptionist/tables/available-tables/available-tables.component';
import { ChangPasswordComponent } from './chang-password/chang-password.component';
import { AvailableOrderTablesComponent } from './new-order/available-order-tables/available-order-tables.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { PaymentDetailsComponent } from './orders/payment-details/payment-details.component';
import { CategoryReportsComponent } from '../shared/reports/category-reports/category-reports.component';
import { ExpensesReportsComponent } from '../shared/reports/expenses-reports/expenses-reports.component';
import { ItemReportsComponent } from '../shared/reports/item-reports/item-reports.component';
import { OrderReportsComponent } from '../shared/reports/order-reports/order-reports.component';
import { TableReportsComponent } from '../shared/reports/table-reports/table-reports.component';
import { WaiterReportsComponent } from '../shared/reports/waiter-reports/waiter-reports.component';


const routes: Routes = [
  {
    path: '',
    canActivate: [ReceptionistAuthGuardService],
    component: ReceptionistComponent,
    children: [
      {
        path: '',
        component: OverviewComponent
      },
      {
        path: 'available-waiters',
        component: AvailableWaitersComponent
      },
      {
        path: 'orders',
        component: OrdersComponent
      },
      {
        path: 'orders/:id',
        component: OrdersComponent
      },
      {
        path: 'newOrder',
        component: AvailableOrderTablesComponent
      },
      {
        path: 'newOrder/:id',
        component: NewOrderComponent
      },
      {
        path: 'profile',
        component: ProfileComponent
      },
      {
        path: 'allOrders',
        component: AllOrdersComponent
      },
      
      {
        path: 'tables/available-tables',
        component: AvailableTablesComponent
      },
      {
        path: 'change-password',
        component: ChangPasswordComponent
      },
      {
        path: 'invoice/:id',
        component: InvoiceComponent
      },
      {
        path: 'payment-datails/:id',
        component: PaymentDetailsComponent
      },
      {
        path: 'order-report',
        component: OrderReportsComponent
      },
      {
        path: 'item-report',
        component: ItemReportsComponent
      },
      {
        path: 'category-report',
        component: CategoryReportsComponent
      },
      {
        path: 'table-report',
        component: TableReportsComponent
      },
      {
        path: 'waiter-report',
        component: WaiterReportsComponent
      },
      {
        path: 'expense-report',
        component: ExpensesReportsComponent
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReceptionistRoutingModule { }
