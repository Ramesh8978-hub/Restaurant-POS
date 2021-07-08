import { UserUpdateStatus } from "src/common/enums/user-status";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class UserStatus {
    @PrimaryGeneratedColumn()
    id?: number

    @Column('enum', {
        unique:true,
        enum: UserUpdateStatus,
        nullable:false
    })
    userStatus: UserUpdateStatus

    @Column({nullable:false})
    status: boolean

    @Column({ type: "datetime",nullable:false })
    createdAt: Date

    @ManyToOne(type => User, user => user.userStatuses,{nullable:true})
    createdBy: User

    @Column({ type: "datetime",nullable:true })
    updatedAt: Date

    @Column({nullable:true})
    updatedBy: number;

    @OneToMany(type=> User, user => user.userStatus)
    user: User
}
