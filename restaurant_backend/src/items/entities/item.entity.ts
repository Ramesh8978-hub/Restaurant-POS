import { Category } from "src/category/entities/category.entity";
import { OrdersItem } from "src/orders-items/entities/orders-item.entity";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
// import { ItemImages } from "./items-images.entity";

@Entity()
export class Item {
    @PrimaryGeneratedColumn()
    id?: number

    @ManyToOne(type => Category, category => category.item,{nullable:false})
    category: Category

    @Column({nullable:false})
    itemName: string

    @Column({nullable:false})
    price: number

    @Column({nullable:true})
    priority: number


    @Column({nullable:true})
    imagepath: string

    @Column({nullable:false})
    status: boolean

    @Column({ type: "datetime",nullable:false })
    createdAt: Date

    @Column({ type: "datetime",nullable:true })
    updatedAt: Date

    @Column({nullable:true})
    updatedBy: number

    @ManyToOne(type => User, user => user.item,{nullable:false})
    createdBy: User

}
