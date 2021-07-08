import { Module } from '@nestjs/common';
import { UserStatusService } from './user-status.service';
import { UserStatusController } from './user-status.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserStatusRepository } from './repository/user-status.repository';
import { UserRepository } from 'src/user/repository/user.repository';

@Module({
  imports:[TypeOrmModule.forFeature([UserStatusRepository,UserRepository])],
  controllers: [UserStatusController],
  providers: [UserStatusService]
})
export class UserStatusModule {}
