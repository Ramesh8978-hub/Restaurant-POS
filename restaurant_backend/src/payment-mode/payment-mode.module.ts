import { Module } from '@nestjs/common';
import { PaymentModeService } from './payment-mode.service';
import { PaymentModeController } from './payment-mode.controller';
import { PaymentModeRepository } from './repository/payment-mode.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from 'src/user/repository/user.repository';

@Module({
  imports :[TypeOrmModule.forFeature([PaymentModeRepository,UserRepository])],
  controllers: [PaymentModeController],
  providers: [PaymentModeService]
})
export class PaymentModeModule {}
