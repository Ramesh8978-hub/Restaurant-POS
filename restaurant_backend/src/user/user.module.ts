import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './repository/user.repository';
import { RoleRepository } from 'src/roles/repository/roles.repository';
import { UserStatusRepository } from 'src/user-status/repository/user-status.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserRepository,
      RoleRepository,
      UserStatusRepository,
    ])
  ],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule { }
