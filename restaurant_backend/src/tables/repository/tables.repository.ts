import { EntityRepository, Repository } from "typeorm";
import { Table } from "../entities/table.entity";


@EntityRepository(Table)
export class TableRepository extends Repository<Table>{

}