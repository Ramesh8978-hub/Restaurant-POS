import { EntityRepository, Repository } from "typeorm";
import { Receptionist } from "../entities/receptionist.entity";


@EntityRepository(Receptionist)
export class ReceptionistRepository extends Repository<Receptionist>{
    
}