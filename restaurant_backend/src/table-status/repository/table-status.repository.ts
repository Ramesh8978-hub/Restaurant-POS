import { EntityRepository, Repository } from "typeorm";
import { TableStatus } from "../entities/table-status.entity";


@EntityRepository(TableStatus)
export class TableStatusRepository extends Repository<TableStatus>{
    
}