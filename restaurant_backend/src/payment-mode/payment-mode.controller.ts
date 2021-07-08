import { Controller, Get, Post, Body, Put, Param, Delete, UsePipes, ValidationPipe, ParseIntPipe } from '@nestjs/common';
import { PaymentModeService } from './payment-mode.service';
import { CreatePaymentModeDto } from './dto/create-payment-mode.dto';
import { UpdatePaymentModeDto } from './dto/update-payment-mode.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Payment-Mode')
@Controller('payment-mode')
export class PaymentModeController {
  constructor(private readonly paymentModeService: PaymentModeService) {}

  @Post()
  @UsePipes(ValidationPipe)
  create(@Body() createPaymentModeDto: CreatePaymentModeDto) {
    return this.paymentModeService.create(createPaymentModeDto);
  }

  @Get()
  getAllPaymentModes() {
    return this.paymentModeService.getAllPaymentModes();
  }
  
  @Get('status')
  getPaymentModeByStatus() {
    return this.paymentModeService.getPaymentModeByStatus();
  }

  @Get(':id')
  findOne(@Param('id',ParseIntPipe) id: number) {
    return this.paymentModeService.findOne(id);
  }

  @Put(':id')
  @UsePipes(ValidationPipe)
  update(@Param('id',ParseIntPipe) id: number, @Body() updatePaymentModeDto: UpdatePaymentModeDto) {
    return this.paymentModeService.update(id, updatePaymentModeDto);
  }

  @Delete(':id')
  remove(@Param('id',ParseIntPipe) id: number) {
    return this.paymentModeService.remove(id);
  }
}
