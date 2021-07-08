import { EntityRepository, Repository } from "typeorm";
import { UserStatus } from "../entities/user-status.entity";

@EntityRepository(UserStatus)
export class UserStatusRepository extends Repository<UserStatus>{
    
}