import { Expense } from "src/expenses/entities/expense.entity";
import { Order } from "src/orders/entities/order.entity";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity() export class PaymentMode {
    @PrimaryGeneratedColumn()
    id?:number

    @Column({unique:true,nullable:false})
    paymentMode:string

    @Column({nullable:false})
    status:boolean

    @Column({nullable:false})
    createdAt:Date

    @ManyToOne(type => User, user => user.paymentMode,{nullable:false})
    createdBy: User

    @Column({nullable:true})
    updatedAt:Date

    @Column({nullable:true})
    updatedBy:number

    @OneToMany(type => Order, order=>order.paymentMode,{nullable:false})
    order:Order

    @OneToMany(type => Expense, expense=>expense.paymentMode)
    expense:Expense
}
