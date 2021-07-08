import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OrdersItemRepository } from 'src/orders-items/repository/orders-items.repository';
import { OrderRepository } from 'src/orders/repository/orders.repository';
import { CreateReceptionistDto } from './dto/create-receptionist.dto';
import { UpdateReceptionistDto } from './dto/update-receptionist.dto';


@Injectable()
export class ReceptionistService {
  constructor(
  ) { }
  create(createReceptionistDto: CreateReceptionistDto) {

    return 'This action adds a new receptionist';
  }

  findAll() {
    return `This action returns all receptionist`;
  }

  findOne(id: number) {
    return `This action returns a #${id} receptionist`;
  }

  update(id: number, updateReceptionistDto: UpdateReceptionistDto) {
    return `This action updates a #${id} receptionist`;
  }

  remove(id: number) {
    return `This action removes a #${id} receptionist`;
  }

}
