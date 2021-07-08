import { OrderStatus } from "src/order-status/entities/order-status.entity";
import { OrdersItem } from "src/orders-items/entities/orders-item.entity";
import { PaymentMode } from "src/payment-mode/entities/payment-mode.entity";
import { Table } from "src/tables/entities/table.entity";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
@Entity()
export class Order {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column({nullable:false})
    date: Date;

    @Column({nullable:false})
    amount: number;

    @Column({nullable:true})
    discount: number;

    @Column({nullable:true})
    discountAmount: number;

    @Column({nullable:true})
    totalAmount: number;

    @Column({nullable:false})
    createdAt: Date;

    @ManyToOne(type => User, user => user.order,{nullable:false})
    createdBy: User

    @Column({nullable:true})
    updatedAt: Date;

    @Column({nullable:true})
    updatedBy: number;

    @ManyToOne(()=> Table, (table:Table) => table.order, {nullable:false,onDelete: 'CASCADE'})
    table: Table

    @ManyToOne(type => PaymentMode, paymentMode => paymentMode.order,{nullable:true})
    paymentMode: PaymentMode

    @ManyToOne(type => OrderStatus, orderStatus => orderStatus.order,{nullable:false})
    orderStatus: OrderStatus

    @ManyToOne(type => User, user => user.waiter,{nullable:false})
    waiter: User

    @ManyToOne(type => User, user => user.kitchen,{nullable:true})
    kitchen: User

    @ManyToOne(type => User, user => user.reception,{nullable:true})
    reception: User

    @OneToMany(type => OrdersItem, orderitem => orderitem.order)
    orderitem:OrdersItem
}
