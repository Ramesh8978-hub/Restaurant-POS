import { Category } from "src/category/entities/category.entity";
import { RolesEnum } from "src/common/enums/role";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Role {
    @PrimaryGeneratedColumn()
    id?: number

    @Column('enum', {
        unique: true,
        enum: RolesEnum,
        nullable:false
    })
    role: RolesEnum

    @Column({nullable:false})
    status: boolean

    @Column({ type: "datetime",nullable:false })
    createdAt: Date


    @OneToMany(type => User, user => user.role)
    user: User

    @OneToMany(type => Category, category => category.createdBy)
    category: Category
}
