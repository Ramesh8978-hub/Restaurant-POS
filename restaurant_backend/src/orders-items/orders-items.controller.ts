import { Controller, Get, Post, Body, Put, Param, Delete, ParseIntPipe, UsePipes, ValidationPipe } from '@nestjs/common';
import { OrdersItemsService } from './orders-items.service';
import { CreateOrdersItemDto, KitchenStatusDto, QuantityDto } from './dto/orders-item.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Order-Items')
@Controller('orders-items')
export class OrdersItemsController {
  constructor(private readonly ordersItemsService: OrdersItemsService) { }

  @Post()
  @UsePipes(ValidationPipe)
  create(@Body() createOrdersItemDto: CreateOrdersItemDto) {
    return this.ordersItemsService.create(createOrdersItemDto);
  }

  @Get()
  findAll() {
    return this.ordersItemsService.findAll();
  }

  @Get(':orderId')
  findOne(@Param('orderId', ParseIntPipe) orderId: number) {
    return this.ordersItemsService.findOne(orderId);
  }

  
  @Put('kitchenStatus/:id')
  @UsePipes(ValidationPipe)
  updateKitchenStatus(@Param('id', ParseIntPipe) id: number, @Body()kitchenStatusDto: KitchenStatusDto) {
    return this.ordersItemsService.updateKitchenStatus(id, kitchenStatusDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.ordersItemsService.remove(id);
  }
  
  @Put('updateQuantity/:id')
  @UsePipes(ValidationPipe)
  updateQty(@Param('id',ParseIntPipe) id: number, @Body() quantityDto: QuantityDto) {
    return this.ordersItemsService.updateQty(id, quantityDto);
  }

  @Post('reports')
  reportsByDate(@Body() body) {
    return this.ordersItemsService.reportsByDate(body.fromDate,body.toDate);
  }
  @Post('all-reports')
  allReports() {
    return this.ordersItemsService.allReports();
  }


     
}
