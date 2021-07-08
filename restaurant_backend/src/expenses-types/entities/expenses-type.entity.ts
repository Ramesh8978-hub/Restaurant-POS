import { Expense } from "src/expenses/entities/expense.entity";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ExpensesType {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column({nullable:false})
    type: string;

    @Column({nullable:false})
    status: boolean;

    @Column({ type: "datetime",nullable:false })
    createdAt: Date;

    @ManyToOne(type => User, user => user.expensesType,{nullable:false})
    createdBy: User
  
    @Column({ type: "datetime",nullable:true })
    updatedAt: Date;

    @Column({nullable:true})
    updatedBy: number

    @OneToMany(type => Expense, expense => expense.expensestype)
    expense: Expense


}
