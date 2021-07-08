import { OrderUpdateStatus } from "src/common/enums/order-status";
import { Order } from "src/orders/entities/order.entity";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity() export class OrderStatus {
    @PrimaryGeneratedColumn()
    id?: number

    @Column('enum', {
        unique:true,
        enum: OrderUpdateStatus,
        nullable:false
    })
    orderStatus: OrderUpdateStatus

    @Column({nullable:false})
    status: boolean

    @Column({ type: "datetime",nullable:false })
    createdAt: Date

    @ManyToOne(type => User, user => user.orderStatus,{nullable:false})
    createdBy: User

    @Column({ type: "datetime",nullable:true })
    updatedAt: Date

    @Column({nullable:true})
    updatedBy: number

    @OneToMany(type => Order, order => order.orderStatus)
    order: Order
}
