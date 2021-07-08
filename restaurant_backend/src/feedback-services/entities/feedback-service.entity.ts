import { Feedback } from "src/feedback/entities/feedback.entity";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class FeedbackService {
    @PrimaryGeneratedColumn()
    id?:number;

    @Column({nullable:false})
    question:string;

    @Column({nullable:false})
    status:boolean;

    @Column({
        type: "datetime",
        nullable:false
    })
    createdAt:Date;

    @ManyToOne(type => User, user => user.feedbackService,{nullable:false})
    createdBy: User
    // @Column()
    // createdBy:number;

    @Column({
        type: "datetime",
        nullable:true
    })
    updatedAt:Date;
    
    @Column({nullable:true})
    updatedBy:number

    @OneToMany(type => Feedback, feedback => feedback.question)
    feedback:Feedback
   

}
