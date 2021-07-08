import { RolesService } from '../shared/services/roles.service';
import { FeedbackService } from '../shared/services/feedback.service';
import { FeedbackServicesService } from 'src/app/shared/services/feedback-services.service';
import { PaymentModeService } from 'src/app/shared/services/payment-mode.service';
import { OrderStatusService } from 'src/app/shared/services/order-status.service';
import { KitchenStatusService } from 'src/app/shared/services/kitchen-status.service';
import { TableStatusService } from 'src/app/shared/services/table-status.service';
import { TablesService } from '../shared/services/tables.service';
import { UsersService } from '../shared/services/users.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../shared/material/material.module';
import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { NavComponent } from './nav/nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CategoryComponent } from './category/category.component';
import { ItemsComponent } from './items/items.component';
import { TablesComponent } from './tables/tables.component';
import { EmployeesComponent } from './employees/employees.component';
import { OrdersComponent } from './orders/orders.component';
import { PaymentsComponent } from './payments/payments.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { AddCategoryComponent } from './category/add-category/add-category.component';
import { AddTablesComponent } from './tables/add-tables/add-tables.component';
import { AddEmployeesComponent } from './employees/add-employees/add-employees.component';
import { AddItemComponent } from './items/add-item/add-item.component';
import { VewItemComponent } from './items/vew-item/vew-item.component';
import { TableStatusComponent } from './table-status/table-status.component';
import { KitchenStatusComponent } from './kitchen-status/kitchen-status.component';
import { OrderStatusComponent } from './order-status/order-status.component';
import { FeedbackServiceComponent } from './feedback-service/feedback-service.component';
import { ProfileComponent } from './profile/profile.component';
import { AddStatusComponent } from './table-status/add-status/add-status.component';
import { AddOrdersStatusComponent } from './order-status/add-orders-status/add-orders-status.component';
import { AddKitchenStatusComponent } from './kitchen-status/add-kitchen-status/add-kitchen-status.component';
import { AddPaymentsModeComponent } from './payment-mode/add-payments-mode/add-payments-mode.component';
import { AddFeedbackServiceComponent } from './feedback-service/add-feedback-service/add-feedback-service.component';
import { PaymentModeComponent } from './payment-mode/payment-mode.component';
import { CategoryService } from '../shared/services/category.service';
import { WaiterOrdersComponent } from './orders/waiter-orders/waiter-orders.component';
import { TableOrdersComponent } from './tables/table-orders/table-orders.component';
import { ChefOrdersComponent } from './orders/chef-orders/chef-orders.component';
import { AvailableTablesComponent } from './tables/available-tables/available-tables.component';
import { AvailableWaitersComponent } from './employees/available-waiters/available-waiters.component';
import { WaitersComponent } from './orders/waiters/waiters.component';
import { KitchenComponent } from './orders/kitchen/kitchen.component';
import { TableComponent } from './orders/table/table.component';
import { UserStatusComponent } from './user-status/user-status.component';
import { UserStatusService } from '../shared/services/user-status.service';
import { AddUserStatusComponent } from './user-status/add-user-status/add-user-status.component';
import { TotalTableOrdersComponent } from './orders/total-table-orders/total-table-orders.component';
import { AuthService } from '../auth/core/services/auth.service';
import { GoogleChartsModule } from 'angular-google-charts';
import { OrderModule } from 'ngx-order-pipe';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import { ExpensesComponent } from './expenses/expenses.component';
import { AddExpensesComponent } from './expenses/add-expenses/add-expenses.component';
import { ExpensesTypeComponent } from './expenses-type/expenses-type.component';
import { AddExpensesTypeComponent } from './expenses-type/add-expenses-type/add-expenses-type.component';
import { ChartsModule } from 'ng2-charts';


@NgModule({
  declarations: [
    AdminComponent,
    ProfileComponent,
    NavComponent,
    DashboardComponent,
    CategoryComponent,
    ItemsComponent,
    TablesComponent,
    EmployeesComponent,
    OrdersComponent,
    PaymentsComponent,
    FeedbackComponent,
    AddCategoryComponent,
    AddTablesComponent,
    AddEmployeesComponent,
    AddItemComponent,
    VewItemComponent,
    TableStatusComponent,
    KitchenStatusComponent,
    OrderStatusComponent,
    FeedbackServiceComponent,
    AddStatusComponent,
    AddOrdersStatusComponent,
    AddKitchenStatusComponent,
    AddPaymentsModeComponent,
    AddFeedbackServiceComponent,
    PaymentModeComponent,
    WaiterOrdersComponent,
    TableOrdersComponent,
    ChefOrdersComponent,
    AvailableTablesComponent,
    AvailableWaitersComponent,
    WaitersComponent,
    KitchenComponent,
    TableComponent,
    UserStatusComponent,
    AddUserStatusComponent,
    TotalTableOrdersComponent,
    ExpensesComponent,
    AddExpensesComponent,
    ExpensesTypeComponent,
    AddExpensesTypeComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    LayoutModule,
    MatToolbarModule,
    MaterialModule,
    HttpClientModule,
    GoogleChartsModule,
    OrderModule,
    ChartsModule
  ],
  providers: [
    UsersService,
    CategoryService,
    TablesService,
    TableStatusService,
    KitchenStatusService,
    OrderStatusService,
    PaymentModeService,
    FeedbackService,
    FeedbackServicesService,
    RolesService,
    UserStatusService,
    AuthService,
    DatePipe
  ]
})
export class AdminModule { }
