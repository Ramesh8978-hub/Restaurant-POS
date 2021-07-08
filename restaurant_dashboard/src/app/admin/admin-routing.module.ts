import { UserStatusComponent } from './user-status/user-status.component';
import { AddKitchenStatusComponent } from './kitchen-status/add-kitchen-status/add-kitchen-status.component';
import { AddOrdersStatusComponent } from './order-status/add-orders-status/add-orders-status.component';
import { AddPaymentsModeComponent } from './payment-mode/add-payments-mode/add-payments-mode.component';
import { AddFeedbackServiceComponent } from './feedback-service/add-feedback-service/add-feedback-service.component';
import { AddTablesComponent } from './tables/add-tables/add-tables.component';
import { FeedbackServiceComponent } from './feedback-service/feedback-service.component';
import { OrderStatusComponent } from './order-status/order-status.component';
import { KitchenStatusComponent } from './kitchen-status/kitchen-status.component';
import { TableStatusComponent } from './table-status/table-status.component';
import { AddEmployeesComponent } from './employees/add-employees/add-employees.component';
import { AddCategoryComponent } from './category/add-category/add-category.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';
import { CategoryComponent } from './category/category.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EmployeesComponent } from './employees/employees.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { ItemsComponent } from './items/items.component';
import { OrdersComponent } from './orders/orders.component';
import { PaymentsComponent } from './payments/payments.component';
import { TablesComponent } from './tables/tables.component';
import { AddItemComponent } from './items/add-item/add-item.component';
import { VewItemComponent } from './items/vew-item/vew-item.component';
import { PaymentModeComponent } from './payment-mode/payment-mode.component';
import { AuthGuardService } from '../auth/core/services/auth-guard.service';
import { ProfileComponent } from './profile/profile.component';
import { AvailableWaitersComponent } from './employees/available-waiters/available-waiters.component';
import { AvailableTablesComponent } from './tables/available-tables/available-tables.component';
import { AddStatusComponent } from './table-status/add-status/add-status.component';
import { WaiterOrdersComponent } from './orders/waiter-orders/waiter-orders.component';
import { WaitersComponent } from './orders/waiters/waiters.component';
import { KitchenComponent } from './orders/kitchen/kitchen.component';
import { TableComponent } from './orders/table/table.component';
import { ChefOrdersComponent } from './orders/chef-orders/chef-orders.component';
import { TableOrdersComponent } from './tables/table-orders/table-orders.component';
import { TotalTableOrdersComponent } from './orders/total-table-orders/total-table-orders.component';
import { ChangPasswordComponent } from '../receptionist/chang-password/chang-password.component';
import { OrderReportsComponent } from '../shared/reports/order-reports/order-reports.component';
import { ItemReportsComponent } from '../shared/reports/item-reports/item-reports.component';
import { CategoryReportsComponent } from '../shared/reports/category-reports/category-reports.component';
import { TableReportsComponent } from '../shared/reports/table-reports/table-reports.component';
import { WaiterReportsComponent } from '../shared/reports/waiter-reports/waiter-reports.component';
import { ExpensesReportsComponent } from '../shared/reports/expenses-reports/expenses-reports.component';
import { ExpensesTypeComponent } from './expenses-type/expenses-type.component';
import { ExpensesComponent } from './expenses/expenses.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuardService],
    component: AdminComponent,
    children: [
      {
        path: '',
        component: DashboardComponent
      },
      {
        path: 'category',
        component: CategoryComponent
      },
      {
        path: 'category/new',
        component: AddCategoryComponent
      },
      {
        path: 'category/:id/edit',
        component: AddCategoryComponent,
      },
      {
        path: 'items',
        component: ItemsComponent
      },
      {
        path: 'items/new',
        component: AddItemComponent
      },
      {
        path: 'items/:id',
        component: VewItemComponent
      },
      {
        path: 'items/:id/edit',
        component: AddItemComponent
      },
      {
        path: 'tables',
        component: TablesComponent
      },
      {
        path: 'tables/available-tables',
        component: AvailableTablesComponent
      },
      {
        path: 'tables/:id/edit',
        component: AddTablesComponent,
      },
      {
        path: 'tables/:id',
        component: TableOrdersComponent
      },
      {
        path: 'table-status',
        component: TableStatusComponent
      },
      {
        path: 'table-status/:id/edit',
        component: AddStatusComponent,
      },
      {
        path: 'kitchen-status',
        component: KitchenStatusComponent
      },
      {
        path: 'kitchen-status/:id/edit',
        component: AddKitchenStatusComponent,
      },
      {
        path: 'employees',
        component: EmployeesComponent
      },
      {
        path: 'employees/available-waiters',
        component: AvailableWaitersComponent
      },
      {
       path: 'employees/new',
       component: AddEmployeesComponent
      },
      {
        path: 'employees/:id/edit',
        component: AddEmployeesComponent,
      },
      {
        path: 'user-status',
        component: UserStatusComponent
      },
      {
        path: 'orders',
        component: OrdersComponent
      },
      {
        path: 'orders/kitchen',
        component: KitchenComponent
      },
      {
        path: 'orders/kitchen/:id',
        component: ChefOrdersComponent
      },
      {
        path: 'orders/tables',
        component: TableComponent
      },
      {
        path: 'orders/tables/:id',
        component: TotalTableOrdersComponent
      },
      {
        path: 'orders/waiter',
        component: WaitersComponent
      },
      {
        path: 'orders/waiter/:id',
        component: WaiterOrdersComponent
      },
      {
        path: 'payments',
        component: PaymentsComponent
      },
      {
        path: 'feedback',
        component: FeedbackComponent
      },
      {
        path: 'orders-status',
        component: OrderStatusComponent
      },
      {
        path: 'orders-status/:id/edit',
        component: AddOrdersStatusComponent,
      },
      {
        path: 'payment-mode',
        component: PaymentModeComponent
      },
      {
        path: 'payment-mode/:id/edit',
        component: AddPaymentsModeComponent,
      },
      {
        path: 'feedback-services',
        component: FeedbackServiceComponent
      },
      {
        path: 'feedback-services/:id/edit',
        component: AddFeedbackServiceComponent,
      },
      {
        path: 'profile',
        component: ProfileComponent
      },
      {
        path: 'change-password',
        component: ChangPasswordComponent
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
      {
        path: 'expenses-type',
        component: ExpensesTypeComponent
      },
      {
        path: 'expenses',
        component: ExpensesComponent
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
