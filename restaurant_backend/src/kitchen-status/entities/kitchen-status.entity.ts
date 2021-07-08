import { KitchenUpdateStatus } from "src/common/enums/kitchen-status";
import { OrdersItem } from "src/orders-items/entities/orders-item.entity";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";




@Entity() export class KitchenStatus {
    @PrimaryGeneratedColumn()
    id?: number

    @Column("enum",{
        unique:true,
        enum:KitchenUpdateStatus,
        nullable:false
    })
    kitchenStatus: KitchenUpdateStatus

    @Column({nullable:false})
    status: boolean

    @Column({ type: "datetime",nullable:false })
    createdAt:Date
    
    @ManyToOne(type => User, user => user.kitchenStatus,{nullable:false})
    createdBy: User
  
    @Column({ type: "datetime",nullable:true })
    updatedAt:Date

    @Column({nullable:true})
    updatedBy:number

    @OneToMany(type => OrdersItem, orderitem => orderitem.kitchenStatus,{nullable:false})
    orderitem:OrdersItem
}
