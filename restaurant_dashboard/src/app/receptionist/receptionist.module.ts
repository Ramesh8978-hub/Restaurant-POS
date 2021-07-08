import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ReceptionistRoutingModule } from './receptionist-routing.module';
import { ReceptionistComponent } from './receptionist.component';
import { NavComponent } from './nav/nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { OverviewComponent } from './overview/overview.component';
import { OrdersComponent } from './orders/orders.component';
import { NewOrderItemComponent } from './orders/new-order-item/new-order-item.component';
import { MaterialModule } from '../shared/material/material.module';
import { ChangPasswordComponent } from './chang-password/chang-password.component';
import { HttpClientModule } from '@angular/common/http';
import { NewOrderComponent } from './new-order/new-order.component';
import { AllOrdersComponent } from './all-orders/all-orders.component';
import { ProfileComponent } from './profile/profile.component';
import { AvailableWaitersComponent } from './available-waiters/available-waiters.component';
import { AvailableTablesComponent } from './tables/available-tables/available-tables.component';
import { AvailableOrderTablesComponent } from './new-order/available-order-tables/available-order-tables.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { PaymentDetailsComponent } from './orders/payment-details/payment-details.component';
import { OrderModule } from 'ngx-order-pipe';
import { ChartsModule } from 'ng2-charts';



@NgModule({
  declarations: [
    ReceptionistComponent,
    NavComponent,
    OverviewComponent,
    OrdersComponent,
    NewOrderItemComponent,
    ChangPasswordComponent,
    NewOrderComponent,
    AllOrdersComponent,
    ProfileComponent,
    AvailableWaitersComponent,
    AvailableTablesComponent,
    AvailableOrderTablesComponent,
    AvailableOrderTablesComponent,
    InvoiceComponent,
    PaymentDetailsComponent
  ],
  imports: [
    CommonModule,
    ReceptionistRoutingModule,
    LayoutModule,
    MaterialModule,
    HttpClientModule,
    OrderModule,
    ChartsModule
  ],
  providers:[
    DatePipe
  ]
})
export class ReceptionistModule { }
