import { EntityRepository, Repository } from "typeorm";
import { Feedback } from "../entities/feedback.entity";

@EntityRepository(Feedback)
export class FeedbackRepository extends Repository<Feedback>{
    
}