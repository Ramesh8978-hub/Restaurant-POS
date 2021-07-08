import { Order } from "src/orders/entities/order.entity";
import { TableStatus } from "src/table-status/entities/table-status.entity";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
 export class Table {
     @PrimaryGeneratedColumn()
     id?:number

     @ManyToOne(type => TableStatus,table=>table.table,{nullable:false})
     tableStatus:TableStatus

     @Column({unique:true,nullable:false})
     tableNumber:number

     @Column({nullable:false})
     sittingCapacity:number

     @Column({nullable:false})
     status:boolean

     @Column({nullable:false})
     createdAt:Date
     
     @ManyToOne(type => User, user => user.table,{nullable:false})
     createdBy: User

     @Column({nullable:true})
     updatedAt:Date
 
     @Column({nullable:true})
     updatedBy:number

    @OneToMany(() => Order, (order: Order) => order.table,{cascade:true})
    order: Order[]
 }
