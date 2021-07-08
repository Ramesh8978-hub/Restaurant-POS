import { Controller, Get, Post, Body, Put, Param, Delete, ParseIntPipe, UsePipes, ValidationPipe } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { ChangeTableDto, CreateOrderDto, OrderStatusDto, PaymentModeDto, UpdateAmountDto } from './dto/order.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Orders')
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) { }

  @Post()
  @UsePipes(ValidationPipe)
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.ordersService.create(createOrderDto);
  }

  @Get()
  findAll() {
    return this.ordersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ordersService.findOne(+id);
  }

  @Get('tableOrders/:tableId')
  getTableOrders(@Param('tableId', ParseIntPipe) tableId: number) {
    return this.ordersService.getTableOrders(tableId);
  }
  @Get('tablePlacedOrders/:tableId')
  getTablePlacedOrders(@Param('tableId', ParseIntPipe) tableId: number) {
    return this.ordersService.getTablePlacedOrders(tableId);
  }
  @Get('tableOrderItems/:tableId')
  getTableOrderItems(@Param('tableId', ParseIntPipe) tableId: number) {
    return this.ordersService.getTableOrderItems(tableId);
  }

  @Get('waiterOrders/:waiterId')
  getWaiterOrders(@Param('waiterId', ParseIntPipe) waiterId: number) {
    return this.ordersService.getWaiterOrders(waiterId);
  }
  @Get('kitchenOrders/:kitchenId')
  getKitchenOrders(@Param('kitchenId', ParseIntPipe) kitchenId: number) {
    return this.ordersService.getKitchenOrders(kitchenId);
  }

  @Put('updateAmount/:id')
  @UsePipes(ValidationPipe)
  updateAmount(@Param('id', ParseIntPipe) id: number, @Body() updateAmountDto: UpdateAmountDto) {
    return this.ordersService.updateAmount(id, updateAmountDto);
  }

  @Put('changeOrderStatusComplete/:id')
  @UsePipes(ValidationPipe)
  updateOrderStatusToComplete(@Param('id', ParseIntPipe) id: number, @Body() orderStatusDto: OrderStatusDto) {
    return this.ordersService.updateOrderStatusToComplete(id, orderStatusDto);
  }
  @Put('changeOrderStatusFinish/:id')
  @UsePipes(ValidationPipe)
  updateOrderStatusToFinish(@Param('id', ParseIntPipe) id: number, @Body() orderStatusDto: OrderStatusDto) {
    return this.ordersService.updateOrderStatusToFinish(id, orderStatusDto);
  }
  @Put('changePaymentMode/:id')
  @UsePipes(ValidationPipe)
  updatePaymentMode(@Param('id', ParseIntPipe) id: number, @Body() paymentModeDto: PaymentModeDto) {
    return this.ordersService.updatePaymentMode(id, paymentModeDto);
  }
  @Put('changeTable/:id')
  @UsePipes(ValidationPipe)
  changeTable(@Param('id', ParseIntPipe) id: number, @Body() changeTableDto: ChangeTableDto) {
    return this.ordersService.changeTable(id, changeTableDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.ordersService.remove(id);
  }

  @Post('reports')
  reportsByDate(@Body() body) {
    return this.ordersService.reportsByDate(body.fromDate,body.toDate);
  }

  @Post('placed-served-count')
  placedOrdersCount() {
    return this.ordersService.placedOrdersCount();
  }

  @Post('table-reports')
  tableReports(@Body() body) {
    return this.ordersService.tableReports(body.fromDate,body.toDate,body.id);
  }
  @Post('waiter-reports')
  waiterReports(@Body() body) {
    return this.ordersService.waiterReports(body.fromDate,body.toDate,body.id);
  }

}

