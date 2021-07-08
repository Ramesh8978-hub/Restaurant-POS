import { FeedbackService } from "src/feedback-services/entities/feedback-service.entity";
import { User } from "src/user/entities/user.entity";
import {  Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Feedback{
    @PrimaryGeneratedColumn()
    id?:number;

    
    @ManyToOne(type => User, user => user.feedback,{nullable:false})
    waiter: User

    @Column({nullable:true})
    customerName:string;

    @ManyToOne(type => FeedbackService, feedbackService => feedbackService.feedback,{nullable:false})
    question: FeedbackService

    @Column()
    feedback:string;

    @Column({
    type: "datetime",nullable:false
})
    createdAt:Date;
    
    //  @ManyToOne(type => User, user => user.feedback)
    //  createdBy: User

    // @Column({
    //     type: "datetime",})
    // updatedAt:Date;
    
    // @Column()
    // updatedBy:number

}
