import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { startOfDay, endOfDay } from 'date-fns';
import { groupBy } from 'rxjs/internal/operators/groupBy';
import { CategoryRepository } from 'src/category/repository/category.repository';
import { KitchenUpdateStatus } from 'src/common/enums/kitchen-status';
import { OrderUpdateStatus } from 'src/common/enums/order-status';
import { TableUpdateStatus } from 'src/common/enums/table-status';
import { ItemRepository } from 'src/items/repository/items.repository';
import { KitchenStatusRepository } from 'src/kitchen-status/repository/kitchen-status.repository';
import { OrderStatusRepository } from 'src/order-status/repository/order-status.repository';
import { OrderRepository } from 'src/orders/repository/orders.repository';
import { TableStatusRepository } from 'src/table-status/repository/table-status.repository';
import { TableRepository } from 'src/tables/repository/tables.repository';
import { UserRepository } from 'src/user/repository/user.repository';
import { Between } from 'typeorm';
import { CreateOrdersItemDto, KitchenStatusDto, QuantityDto } from './dto/orders-item.dto';
import { OrdersItemRepository } from './repository/orders-items.repository';

@Injectable()
export class OrdersItemsService {
  constructor(
    @InjectRepository(OrdersItemRepository) private orderItemsRepository: OrdersItemRepository,
    @InjectRepository(OrderRepository) private orderRepository: OrderRepository,
    @InjectRepository(ItemRepository) private itemRepository: ItemRepository,
    @InjectRepository(KitchenStatusRepository) private kitchenStatusRepository: KitchenStatusRepository,
    @InjectRepository(UserRepository) private userRepository: UserRepository,
    @InjectRepository(CategoryRepository) private categoryRepository: CategoryRepository,
    @InjectRepository(TableStatusRepository) private tableStatusRepository: TableStatusRepository,
    @InjectRepository(TableRepository) private tableRepository: TableRepository,
    @InjectRepository(OrderStatusRepository) private orderStatusRepository: OrderStatusRepository,



  ) { }

  async create(createOrdersItemDto: CreateOrdersItemDto) {
    try {

      let category = await this.categoryRepository.findOne({ id: createOrdersItemDto.categoryId })
      let item = await this.itemRepository.findOne({ id: createOrdersItemDto.itemId })
      let kitchenStatus = await this.kitchenStatusRepository.findOne({ kitchenStatus: KitchenUpdateStatus.PLACED })
      let orderId = await this.orderRepository.findOne({ id: createOrdersItemDto.orderId })
      let id = createOrdersItemDto.orderId
      let createdBy = await this.userRepository.findOne({ id: createOrdersItemDto.createdBy })
      let data = await this.orderItemsRepository.insert({
        order: orderId,
        category: category,
        itemName: item.itemName,
        price: item.price,
        quantity: createOrdersItemDto.quantity,
        amount: (item.price * createOrdersItemDto.quantity),
        description: createOrdersItemDto.description,
        imagepath: item.imagepath,
        kitchenStatus: kitchenStatus,
        createdAt: new Date().toISOString().toString(),
        createdBy: createdBy,
      });
      return data;
    }
    catch (e) {
      throw new HttpException({ message: e.message }, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
  async getDateAndTime() {
    const time = new Date().toISOString().toString().split('T')[1].split('.')[0]
  }

  async findAll() {
    try {
      return await this.orderItemsRepository.find({ relations: ['category', 'order', 'kitchenStatus', 'createdBy'] });
    }
    catch (e) {
      throw new HttpException({ message: e.message }, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async findOne(orderId: number) {
    try {
      const ordersItem = await this.orderItemsRepository.findOne({ where: { id: orderId }, relations: ['category', 'order', 'createdBy'] })
      if (ordersItem) {
        return ordersItem;
      }
      else {
        throw new HttpException("Cannot find the Order-Item", HttpStatus.NOT_FOUND)
      }
    }
    catch (e) {
      throw new HttpException({ message: e.message }, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async updateKitchenStatus(id: number, kitchenStatusDto: KitchenStatusDto) {
    try {
      let orderItem = await this.orderItemsRepository.findOne({ id }, { relations: ['order'] })
      let order = await this.orderRepository.findOne({ where: { id: orderItem.order.id }, relations: ['table', 'orderStatus'] })
      let kitchenStatus = await this.kitchenStatusRepository.findOne({ id: kitchenStatusDto.kitchenStatusId })
      let tableStatusServed = await this.tableStatusRepository.findOne({ where: { tableStatus: TableUpdateStatus.SERVED } })
      let orderStatus = await this.orderStatusRepository.findOne({ where: { orderStatus: OrderUpdateStatus.SERVED } })
      let kitchen = await this.userRepository.findOne({ where: { id: kitchenStatusDto.updatedBy } })

      await this.orderRepository.update({ id: orderItem.order.id }, {
        kitchen: kitchen,
        updatedAt: new Date().toISOString().toString(),
        updatedBy: kitchenStatusDto.updatedBy
      })

      if (kitchenStatus.kitchenStatus === KitchenUpdateStatus.COMPLETED) {
        await this.tableRepository.update({ id: order.table.id }, {
          tableStatus: tableStatusServed,
          updatedAt: new Date().toISOString().toString(),
          updatedBy: kitchenStatusDto.updatedBy
        }),
          await this.orderRepository.update({ id: orderItem.order.id }, {
            orderStatus,
            updatedAt: new Date().toISOString().toString(),
            updatedBy: kitchenStatusDto.updatedBy
          })
      }

      const data = await this.orderItemsRepository.update({ id }, {
        kitchenStatus: kitchenStatus,
        updatedAt: new Date().toISOString().toString(),
        updatedBy: kitchenStatusDto.updatedBy
      })
      return data;
    }
    catch (e) {
      throw new HttpException({ message: e.message }, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async updateQty(id: number, quantityDto: QuantityDto) {
    try {
      const ordersItem = await this.orderItemsRepository.findOne({ id })
      await this.orderItemsRepository.update({ id }, {
        quantity: quantityDto.quantity,
        amount: (ordersItem.price * quantityDto.quantity),
        updatedAt: new Date().toISOString().toString(),
        updatedBy: quantityDto.updatedBy
      })
      return {
        status: 200,
        message: 'Quantity updated successfully'
      }
    }
    catch (e) {
      throw new HttpException({ message: e.message }, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async remove(id: number) {
    try {
      const ordersItem = await this.orderItemsRepository.findOne({ where: { id } })
      if (ordersItem) {
        return await this.orderItemsRepository.remove(ordersItem);
      }
      else {
        throw new HttpException("Cannot find the Order-Item", HttpStatus.NOT_FOUND)
      }
    }
    catch (e) {
      throw new HttpException({ message: e.message }, HttpStatus.INTERNAL_SERVER_ERROR)
    }

  }

  async reportsByDate(fromDate: string, toDate: string) {
    try {
      let orderStatus = await this.orderStatusRepository.findOne({
        where:
          { orderStatus: OrderUpdateStatus.COMPLETED },
      })
      let orderItems = [];
      let order = await this.orderRepository.find({where:{orderStatus},relations:['orderStatus']})
      for await (let ord of order) {
        let orderitem = await this.orderItemsRepository.find({
          where: { 
            createdAt: Between(startOfDay(Date.parse(fromDate)), endOfDay(Date.parse(toDate))),
            order: ord
           },
          relations: ['order', 'order.orderStatus', 'order.waiter', 'order.table', 'kitchenStatus', 'category']
        })
        orderItems = [...orderItems, ...orderitem]
      }
      return orderItems;
    }
    catch (e) {
      throw new HttpException({ message: e.message }, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async allReports() {
    try {
      let orderStatus = await this.orderStatusRepository.findOne({
        where:
          { orderStatus: OrderUpdateStatus.COMPLETED },
      })
      let orderItems = [];
      let order = await this.orderRepository.find({where:{orderStatus},relations:['orderStatus']})
      for await (let ord of order) {
        let orderitem = await this.orderItemsRepository.find({
          where: { 
            order: ord
           },
          relations: ['order', 'order.orderStatus', 'order.waiter', 'order.table', 'kitchenStatus', 'category']
        })
        orderItems = [...orderItems, ...orderitem]
      }
      return orderItems;
    }
    catch (e) {
      throw new HttpException({ message: e.message }, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
  




}

