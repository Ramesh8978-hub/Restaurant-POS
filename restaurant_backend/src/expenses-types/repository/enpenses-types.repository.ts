import { EntityRepository, Repository } from "typeorm";
import { ExpensesType } from "../entities/expenses-type.entity";

@EntityRepository(ExpensesType)
export class ExpensesTypeRepository extends Repository<ExpensesType>{
    
}