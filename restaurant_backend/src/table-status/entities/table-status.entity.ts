import { TableUpdateStatus } from "src/common/enums/table-status";
import { Table } from "src/tables/entities/table.entity";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class TableStatus {
    @PrimaryGeneratedColumn()
    id?: number

    @Column('enum',{
        unique:true,
        enum:TableUpdateStatus,
        nullable:false
    })
    tableStatus: TableUpdateStatus

    @Column({nullable:false})
    status: boolean

    @Column({ type: "datetime",nullable:false })
    createdAt: Date

    @ManyToOne(type => User, user => user.tableStatus,{nullable:false})
    createdBy: User
    
    @Column({ type: "datetime",nullable:true })
    updatedAt: Date

    @Column({nullable:true})
    updatedBy: number

    @OneToMany(type => Table,table=>table.tableStatus)
    table:Table
}
