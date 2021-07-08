import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderUpdateStatus } from 'src/common/enums/order-status';
import { TableUpdateStatus } from 'src/common/enums/table-status';
import { UserUpdateStatus } from 'src/common/enums/user-status';
import { KitchenStatusRepository } from 'src/kitchen-status/repository/kitchen-status.repository';
import { OrderStatusRepository } from 'src/order-status/repository/order-status.repository';
import { OrdersItemRepository } from 'src/orders-items/repository/orders-items.repository';
import { PaymentModeRepository } from 'src/payment-mode/repository/payment-mode.repository';
import { TableStatusRepository } from 'src/table-status/repository/table-status.repository';
import { TableRepository } from 'src/tables/repository/tables.repository';
import { UserStatusRepository } from 'src/user-status/repository/user-status.repository';
import { UserRepository } from 'src/user/repository/user.repository';
import { Between } from 'typeorm';
import { ChangeTableDto, CreateOrderDto, OrderStatusDto, PaymentModeDto, UpdateAmountDto } from './dto/order.dto';
import { OrderRepository } from './repository/orders.repository';
import { startOfDay, endOfDay } from 'date-fns';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(OrderRepository) private orderRepository: OrderRepository,
    @InjectRepository(UserRepository) private userRepository: UserRepository,
    @InjectRepository(TableRepository) private tableRepository: TableRepository,
    @InjectRepository(PaymentModeRepository) private paymentModeRepository: PaymentModeRepository,
    @InjectRepository(OrderStatusRepository) private orderStatusRepository: OrderStatusRepository,
    @InjectRepository(UserStatusRepository) private userStatusRepository: UserStatusRepository,
    @InjectRepository(TableStatusRepository) private tableStatusRepository: TableStatusRepository,
    @InjectRepository(OrdersItemRepository) private ordersItemRepository: OrdersItemRepository,

  ) { }
  async create(createOrderDto: CreateOrderDto) {
    try {
      let table = await this.tableRepository.findOne({ id: createOrderDto.tableId })
      let orderStatus = await this.orderStatusRepository.findOne({ where: { orderStatus: OrderUpdateStatus.PLACED } })
      let waiter = await this.userRepository.findOne({ id: createOrderDto.waiterId })
      let userStatus = await this.userStatusRepository.findOne({ where: { userStatus: UserUpdateStatus.SERVED } })
      let tableStatus = await this.tableStatusRepository.findOne({ where: { tableStatus: TableUpdateStatus.PLACED } })
      let createdBy = await this.userRepository.findOne({ id: createOrderDto.createdBy })
      let returnData = await this.orderRepository.insert({
        date: new Date().toISOString().toString(),
        table: table,
        amount: createOrderDto.amount,
        totalAmount: createOrderDto.amount,
        waiter: waiter,
        orderStatus: orderStatus,
        createdAt: new Date().toISOString().toString(),
        createdBy: createdBy,
      });

      const data = await this.userRepository.update({ id: waiter.id }, {
        userStatus
      })
      const tableStatusData = await this.tableRepository.update({ id: table.id }, {
        tableStatus
      })
      return { returnData, data, tableStatusData }
    }
    catch (e) {
      throw new HttpException({ message: e.message }, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async findAll() {
    try {
      return await this.orderRepository.find({ relations: ['table', 'paymentMode', 'waiter', 'orderStatus', 'createdBy'] });
    }
    catch (e) {
      throw new HttpException({ message: e.message }, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async findOne(id: number) {
    try {
      const orderData = await this.orderRepository.findOne({ where: { id }, relations: ['createdBy'] })
      if (orderData) {
        return orderData;
      } else {
        throw new HttpException("Cannot find the Order", HttpStatus.NOT_FOUND)
      }
    }
    catch (e) {
      throw new HttpException({ message: e.message }, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async updateAmount(id: number, updateAmountDto: UpdateAmountDto) {
    try {
      let data = await this.orderRepository.update({ id }, {
        amount: updateAmountDto.amount,
        discount: updateAmountDto.discount,
        discountAmount: (updateAmountDto.amount * updateAmountDto.discount) / 100,
        totalAmount: updateAmountDto.amount - (updateAmountDto.amount * updateAmountDto.discount) / 100,
        updatedAt: new Date().toISOString().toString(),
        updatedBy: updateAmountDto.updatedBy,
      });
      return {
        status: 200,
        message: "Updated Successfully"
      }
    }
    catch (e) {
      throw new HttpException({ message: e.message }, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async remove(id: number) {
    try {
      const orderData = await this.orderRepository.findOne({ where: { id } })
      const orderItem = await this.ordersItemRepository.find({ where: { order: orderData } })

      if (orderData) {
        await this.ordersItemRepository.remove(orderItem)
        await this.orderRepository.remove(orderData);
        return {
          status: 200,
          message: 'Order Deleted Successfully'
        }
      }
      else {
        throw new HttpException("Cannot find the Order", HttpStatus.NOT_FOUND)
      }
    }
    catch (e) {
      throw new HttpException({ message: e.message }, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async updateOrderStatusToFinish(id: number, orderStatusDto: OrderStatusDto) {
    try {
      let orderStatus = await this.orderStatusRepository.findOne({ where: { orderStatus: OrderUpdateStatus.FINISHED } })
      const data = await this.orderRepository.update({ id }, {
        orderStatus,
        updatedAt: new Date().toISOString().toString(),
        updatedBy: orderStatusDto.updatedBy
      })
      return data;
    }
    catch (e) {
      throw new HttpException({ message: e.message }, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async updateOrderStatusToComplete(id: number, orderStatusDto: OrderStatusDto) {
    try {
      let order = await this.orderRepository.findOne({ where: { id }, relations: ['table', 'waiter'] })
      let receptionist = await this.userRepository.findOne({ id: orderStatusDto.updatedBy })
      let orderStatus = await this.orderStatusRepository.findOne({ where: { orderStatus: OrderUpdateStatus.COMPLETED } })
      let userStatus = await this.userStatusRepository.findOne({ where: { userStatus: UserUpdateStatus.AVAILABLE } })
      let tableStatusAvailable = await this.tableStatusRepository.findOne({ where: { tableStatus: TableUpdateStatus.AVAILABLE } })

      const data = await this.orderRepository.update({ id }, {
        orderStatus,
        updatedAt: new Date().toISOString().toString(),
        updatedBy: orderStatusDto.updatedBy
      })
      if (orderStatus.orderStatus === OrderUpdateStatus.COMPLETED) {
        await this.orderRepository.update({ id }, {
          reception: receptionist,
          updatedAt: new Date().toISOString().toString(),
          updatedBy: orderStatusDto.updatedBy
        })
        await this.userRepository.update({ id: order.waiter.id }, {
          userStatus
        })
        await this.tableRepository.update({ id: order.table.id }, {
          tableStatus: tableStatusAvailable
        })
      }
      return data;
    }
    catch (e) {
      throw new HttpException({ message: e.message }, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async updatePaymentMode(id: number, paymentModeDto: PaymentModeDto) {
    try {
      let paymentMode = await this.paymentModeRepository.findOne({ id: paymentModeDto.mopId })
      const data = await this.orderRepository.update({ id }, {
        paymentMode,
        updatedAt: new Date().toISOString().toString(),
        updatedBy: paymentModeDto.updatedBy
      })
      return data;
    }
    catch (e) {
      throw new HttpException({ message: e.message }, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async changeTable(id: number, changeTableDto: ChangeTableDto) {
    try {
      let table = await this.tableRepository.findOne({ id: changeTableDto.tableId })
      let data = await this.orderRepository.update({ id }, {
        table,
        updatedAt: new Date().toISOString().toString(),
        updatedBy: changeTableDto.updatedBy
      })
      return data;
    }
    catch (e) {
      throw new HttpException({ message: e.message }, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async getTableOrders(tableId: number) {
    try {
      let table = await this.tableRepository.findOne({ id: tableId })
      let orderStatus = await this.orderStatusRepository.findOne({ where: { orderStatus: OrderUpdateStatus.COMPLETED } })
      const tableOrdersData = await this.orderRepository.find({
        where: { table, orderStatus },
        relations: ['table', 'paymentMode', 'waiter', 'orderStatus']
      })
      return tableOrdersData;
    }
    catch (e) {
      throw new HttpException({ message: e.message }, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
  async getTablePlacedOrders(tableId: number) {
    try {
      let table = await this.tableRepository.findOne({ id: tableId })
      let orderStatus = await this.orderStatusRepository.findOne({ where: { orderStatus: OrderUpdateStatus.PLACED } })
      const tableOrdersData = await this.orderRepository.find({
        where: { table, orderStatus },
        relations: ['table', 'paymentMode', 'waiter', 'orderStatus']
      })
      return tableOrdersData;
    }
    catch (e) {
      throw new HttpException({ message: e.message }, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async getTableOrderItems(tableId: number) {
    try {
      let table = await this.tableRepository.findOne({ id: tableId })
      let orderStatus = await this.orderStatusRepository.find({
        where: [
          { orderStatus: OrderUpdateStatus.PLACED },
          { orderStatus: OrderUpdateStatus.FINISHED },
          { orderStatus: OrderUpdateStatus.SERVED }
        ]
      })

      let order = [];
      let orderItems = [];

      for await (let status of orderStatus) {
        const orders = await this.orderRepository.find({
          where: { table, orderStatus: status },
          relations: ['table', 'orderStatus']
        })
        order = [...order, ...orders]
      }

      for await (let ord of order) {
        let orderitem = await this.ordersItemRepository.find({
          where: { order: ord },
          relations: ['order', 'createdBy', 'order.orderStatus', 'order.waiter', 'order.table', 'kitchenStatus', 'category']
        })
        orderItems = [...orderItems, ...orderitem]
      }
      return orderItems;
    }
    catch (e) {
      throw new HttpException({ message: e.message }, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
  async getWaiterOrders(waiterId: number) {
    try {
      let waiter = await this.userRepository.findOne({ id: waiterId })
      const waiterOrdersData = await this.orderRepository.find({ where: { waiter }, relations: ['table', 'paymentMode', 'waiter', 'orderStatus'] })
      return waiterOrdersData;
    }
    catch (e) {
      throw new HttpException({ message: e.message }, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
  async getKitchenOrders(kitchenId: number) {
    try {
      let kitchen = await this.userRepository.findOne({ id: kitchenId })
      const kitchenOrdersData = await this.orderRepository.find({ where: { kitchen }, relations: ['table', 'paymentMode', 'kitchen', 'orderStatus'] })
      return kitchenOrdersData;
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
      return await this.orderRepository.find({
        where: {
          date: Between(startOfDay(Date.parse(fromDate)), endOfDay(Date.parse(toDate))),
          orderStatus
        },
        relations: ['table', 'paymentMode', 'waiter', 'waiter.role', 'orderStatus', 'createdBy']
      });
    }
    catch (e) {
      throw new HttpException({ message: e.message }, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
  async tableReports(fromDate: string, toDate: string, id: any) {
    try {
      let orderStatus = await this.orderStatusRepository.findOne({
        where:
          { orderStatus: OrderUpdateStatus.COMPLETED },
      })
      if (id === "All") {
        return await this.orderRepository.find({
          where: {
            date: Between(startOfDay(Date.parse(fromDate)), endOfDay(Date.parse(toDate))),
            orderStatus,
          },
          relations: ['table', 'paymentMode', 'waiter', 'waiter.role', 'orderStatus', 'createdBy']
        });
      }
      else {
        let table = await this.tableRepository.findOne({ where: { id } })
        return await this.orderRepository.find({
          where: {
            date: Between(startOfDay(Date.parse(fromDate)), endOfDay(Date.parse(toDate))),
            orderStatus,
            table
          },
          relations: ['table', 'paymentMode', 'waiter', 'waiter.role', 'orderStatus', 'createdBy']
        });
      }

    }
    catch (e) {
      throw new HttpException({ message: e.message }, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
  async waiterReports(fromDate: string, toDate: string, id: any) {
    try {
      let orderStatus = await this.orderStatusRepository.findOne({
        where:
          { orderStatus: OrderUpdateStatus.COMPLETED },
      })
      if (id === "All") {
        return await this.orderRepository.find({
          where: {
            date: Between(startOfDay(Date.parse(fromDate)), endOfDay(Date.parse(toDate))),
            orderStatus,
          },
          relations: ['table', 'paymentMode', 'waiter', 'waiter.role', 'orderStatus', 'createdBy']
        });
      }
      else {
        let waiter = await this.userRepository.findOne({ id })
        return await this.orderRepository.find({
          where: {
            date: Between(startOfDay(Date.parse(fromDate)), endOfDay(Date.parse(toDate))),
            orderStatus,
            waiter
          },
          relations: ['table', 'paymentMode', 'waiter', 'waiter.role', 'orderStatus', 'createdBy']
        });
      }

    }
    catch (e) {
      throw new HttpException({ message: e.message }, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
  async placedOrdersCount() {
    try {
      let fromDate = new Date()
      let toDate = new Date()
      let placedStatus = await this.orderStatusRepository.findOne({
        where: [
          { orderStatus: OrderUpdateStatus.PLACED },
        ]
      })
      let servedStatus = await this.orderStatusRepository.findOne({
        where: [
          { orderStatus: OrderUpdateStatus.SERVED },
        ]
      })
      let placedOrders = await this.orderRepository.find({
        where: {
          date: Between(startOfDay(fromDate), endOfDay(toDate)),
          orderStatus: placedStatus
        },
        relations: ['orderStatus']
      });
      let servedOrders = await this.orderRepository.find({
        where: {
          date: Between(startOfDay(fromDate), endOfDay(toDate)),
          orderStatus: servedStatus
        },
        relations: ['orderStatus']
      });
      return { placedOrders, servedOrders }
    }
    catch (e) {
      throw new HttpException({ message: e.message }, HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
}
