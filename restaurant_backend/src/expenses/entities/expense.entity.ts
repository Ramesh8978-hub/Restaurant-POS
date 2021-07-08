import { ExpensesType } from "src/expenses-types/entities/expenses-type.entity";
import { PaymentMode } from "src/payment-mode/entities/payment-mode.entity";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Expense{

    @PrimaryGeneratedColumn()
    id?:number

    @ManyToOne(type => ExpensesType, expensestype => expensestype.expense,{nullable:false})
    expensestype: ExpensesType
    
    @Column({nullable:false})
    date:Date;

    @Column({nullable:false})
    name:string;

    @Column({nullable:false})
    amount:number;

    @Column({nullable:true})
    discription: string;

    @Column({
        type: "datetime",
        nullable:false
    })
    createdAt:Date;

    @ManyToOne(type => PaymentMode, paymentMode => paymentMode.expense,{nullable:false})
    paymentMode: PaymentMode

    @ManyToOne(type => User, user => user.expenses,{nullable:true})
    employee: User

    @ManyToOne(type => User, user => user.expense,{nullable:false})
    createdBy: User

    @Column({
        type: "datetime",
        nullable:true
    })
    updatedAt:Date;
    
    @Column({nullable:true})
    updatedBy:number

   
    
}
