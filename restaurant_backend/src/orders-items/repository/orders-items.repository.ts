import { EntityRepository, Repository } from "typeorm";
import { OrdersItem} from "../entities/orders-item.entity";

@EntityRepository(OrdersItem)
export class OrdersItemRepository extends Repository<OrdersItem>{
    
}