import { EntityRepository, Repository } from "typeorm";
import { Expense } from "../entities/expense.entity";

@EntityRepository(Expense)
export class ExpensesRepository extends Repository<Expense>{
    
}