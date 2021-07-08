import { EntityRepository, Repository } from "typeorm";
import { KitchenStatus } from "../entities/kitchen-status.entity";

@EntityRepository(KitchenStatus)
export class KitchenStatusRepository extends Repository<KitchenStatus>{
    
}