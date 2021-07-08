import { EntityRepository, Repository } from "typeorm";
import { PaymentMode } from "../entities/payment-mode.entity";

@EntityRepository(PaymentMode)
export class PaymentModeRepository extends Repository<PaymentMode>{
    
}