import { Item } from "src/items/entities/item.entity";
import { OrdersItem } from "src/orders-items/entities/orders-item.entity";
import { Role } from "src/roles/entities/role.entity";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Category {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column({ unique: true,nullable:false })
    category: string;

    @Column({nullable:false})
    status: boolean;

    @Column({
        type: "datetime",
        nullable:false
    })
    createdAt: Date;

    @ManyToOne(type => User, user => user.category,{nullable:false})
    createdBy: User

    @Column({
        type: "datetime",
        nullable:true
    })
    updatedAt: Date;

    @Column({nullable:true})
    updatedBy: number
    
    @OneToMany(type => Item, item => item.category)
    item:Item



}
