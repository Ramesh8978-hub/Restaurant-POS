import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { PugAdapter } from '@nestjs-modules/mailer/dist/adapters/pug.adapter';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { WaiterModule } from './waiter/waiter.module';
import { ReceptionistModule } from './receptionist/receptionist.module';
import { KitchenModule } from './kitchen/kitchen.module';
import { RolesModule } from './roles/roles.module';
import { CategoryModule } from './category/category.module';
import { TablesModule } from './tables/tables.module';
import { ItemsModule } from './items/items.module';
import { OrdersModule } from './orders/orders.module';
import { OrdersItemsModule } from './orders-items/orders-items.module';
import { ExpensesModule } from './expenses/expenses.module';
import { TableStatusModule } from './table-status/table-status.module';
import { PaymentModeModule } from './payment-mode/payment-mode.module';
import { KitchenStatusModule } from './kitchen-status/kitchen-status.module';
import { OrderStatusModule } from './order-status/order-status.module';
import { FeedbackServicesModule } from './feedback-services/feedback-services.module';
import { FeedbackModule } from './feedback/feedback.module';
import { ExpensesTypesModule } from './expenses-types/expenses-types.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UserStatusModule } from './user-status/user-status.module';
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'restaurantpos',
      entities: ["dist/**/**/*.entity{.ts,.js}"],
      synchronize: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
    }),
    ServeStaticModule.forRoot({
      serveRoot: '/',
      rootPath: join(__dirname, '..', 'public'),
    }),
    MailerModule.forRoot({
      transport: {
        host: "smtp.gmail.com",
        secure: true,
        port: 465,
        auth: {
          user: 'vitatechsolutionsknr@gmail.com',
          pass: 'Vita@123$'
        },
        tls: {
          rejectUnauthorized: false
        }
      },
      preview: false,
      template: {
        dir: process.cwd() + '/template/',
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    }),

    UserModule,
    WaiterModule,
    ReceptionistModule,
    KitchenModule,
    RolesModule,
    CategoryModule,
    TablesModule,
    ItemsModule,
    OrdersModule,
    OrdersItemsModule,
    ExpensesModule,
    TableStatusModule,
    PaymentModeModule,
    KitchenStatusModule,
    OrderStatusModule,
    FeedbackServicesModule,
    FeedbackModule,
    ExpensesTypesModule,
    AuthModule,
    UserStatusModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
