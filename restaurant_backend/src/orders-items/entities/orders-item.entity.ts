import { Category } from "src/category/entities/category.entity";
import { Item } from "src/items/entities/item.entity";
import { KitchenStatus } from "src/kitchen-status/entities/kitchen-status.entity";
import { Order } from "src/orders/entities/order.entity";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
@Entity()
export class OrdersItem {
    @PrimaryGeneratedColumn()
    id?: number;

    @ManyToOne(type => Order, order => order.orderitem,{nullable:false})
    order: Order

    // @ManyToOne(type => Item, item => item.orderitem)
    // item: Item

    @ManyToOne(type => Category, category => category.item,{nullable:false})
    category: Category

    @Column({nullable:false})
    itemName: string

    @Column({nullable:false})
    price: number

    @Column({nullable:false})
    quantity: number;

    @Column({nullable:false})
    amount: number;

    @Column({nullable:true})
    description: string;

    @Column({nullable:true})
    estimationTime: Date;

    @Column({nullable:true})
    imagepath: string

    @ManyToOne(type => KitchenStatus, kitchenStatus => kitchenStatus.orderitem,{nullable:false})
    kitchenStatus: KitchenStatus

    @Column({nullable:false})
    createdAt: Date;

    @ManyToOne(type => User, user => user.ordersItem,{nullable:false})
    createdBy: User

    @Column({nullable:true})
    updatedAt: Date;

    @Column({nullable:true})
    updatedBy: number;

}
