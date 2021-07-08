import { EntityRepository, Repository } from "typeorm";
import { FeedbackService } from "../entities/feedback-service.entity";

@EntityRepository(FeedbackService)
export class FeedbackServiceRepository extends Repository<FeedbackService>{
    
}