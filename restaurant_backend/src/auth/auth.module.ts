import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserService } from 'src/user/user.service';
import { JwtStrategyService } from './jwt-strategy.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from 'src/user/repository/user.repository';
import { jwtConstants } from './constants';
import { RoleRepository } from 'src/roles/repository/roles.repository';
import { UserStatusRepository } from 'src/user-status/repository/user-status.repository';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '36000h' },
    }),
    TypeOrmModule.forFeature([UserRepository,RoleRepository,UserStatusRepository]),
  ],
  providers: [
    AuthService,
    UserService,
    JwtStrategyService,
  ],
  controllers: [AuthController],
 
  exports: [
    AuthService,
    PassportModule,
  ]
})
export class AuthModule { }
