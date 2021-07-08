import { Category } from "src/category/entities/category.entity";
import { ExpensesType } from "src/expenses-types/entities/expenses-type.entity";
import { Expense } from "src/expenses/entities/expense.entity";
import { FeedbackService } from "src/feedback-services/entities/feedback-service.entity";
import { Feedback } from "src/feedback/entities/feedback.entity";
import { Item } from "src/items/entities/item.entity";
import { KitchenStatus } from "src/kitchen-status/entities/kitchen-status.entity";
import { OrderStatus } from "src/order-status/entities/order-status.entity";
import { OrdersItem } from "src/orders-items/entities/orders-item.entity";
import { Order } from "src/orders/entities/order.entity";
import { PaymentMode } from "src/payment-mode/entities/payment-mode.entity";
import { Role } from "src/roles/entities/role.entity";
import { TableStatus } from "src/table-status/entities/table-status.entity";
import { Table } from "src/tables/entities/table.entity";

import { UserStatus } from "src/user-status/entities/user-status.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id?: number

    @Column({nullable:false})
    firstName: string;

    @Column({nullable:false})
    lastName: string;
    
    @Column({ unique: true ,nullable:false})
    username: string;

    @Column({nullable:false})
    password: string;

    @Column({ unique: true,nullable:false })
    email: string;

    @Column({ unique: true,nullable:false })
    mobileNo: string;

    @Column({ unique: true,nullable:true })
    aadharNo: string;

    @Column({nullable:true})
    age: number;

    @Column({nullable:false})
    address: string;

    @Column({nullable:true})
    imagepath: string;

    @Column({nullable:false})
    status: boolean;

    @Column({nullable:true})
    otp: number;

    @Column({ type: "datetime",nullable:true })
    lastLogin: Date

    @Column({ type: "datetime",nullable:false })
    createdAt: Date

    

    @ManyToOne(type => User, user=>user.user,{nullable:true})
    createdBy:User

    @Column({ type: "datetime",nullable:true })
    updatedAt: Date

    @Column({nullable:true})
    updatedBy: number;

    @ManyToOne(type => Role, role => role.user,{nullable:false})
    role: Role

    @ManyToOne(type => UserStatus, role => role.user,{nullable:false})
    userStatus: UserStatus

    


    @OneToMany(type => User, user => user.createdBy)
    user:User

   

    @OneToMany(type => Order, order => order.waiter)
    waiter: Order

    @OneToMany(type => Order, order => order.kitchen)
    kitchen: Order

    @OneToMany(type => Order, order => order.reception)
    reception: Order
     
    @OneToMany(type => Feedback, feedback => feedback.waiter)
    feedback:Feedback

    @OneToMany(type => Item, item => item.createdBy)
    item:Feedback

    @OneToMany(type => Category, category => category.createdBy)
    category:Category

    @OneToMany(type => Table, table => table.createdBy)
    table:Table

    @OneToMany(type => TableStatus, tableStatus => tableStatus.createdBy)
    tableStatus:TableStatus

    @OneToMany(type => KitchenStatus, kitchenStatus => kitchenStatus.createdBy)
    kitchenStatus:KitchenStatus

    @OneToMany(type => OrderStatus, orderStatus => orderStatus.createdBy)
    orderStatus:OrderStatus

    @OneToMany(type => ExpensesType, expensesType => expensesType.createdBy)
    expensesType:ExpensesType

    @OneToMany(type => Expense, expense => expense.createdBy)
    expense:Expense

    @OneToMany(type => Expense, expense => expense.employee)
    expenses:Expense

    @OneToMany(type => PaymentMode, paymentMode => paymentMode.createdBy)
    paymentMode:PaymentMode

    @OneToMany(type => Order, order => order.createdBy)
    order:Order

    @OneToMany(type => OrdersItem, ordersItem => ordersItem.createdBy)
    ordersItem:OrdersItem

    @OneToMany(type => UserStatus, userStatus => userStatus.createdBy)
    userStatuses:UserStatus

    @OneToMany(type => FeedbackService, feedbackService => feedbackService.createdBy)
    feedbackService:FeedbackService

   
}
