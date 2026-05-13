import { Injectable } from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';

import { Order, OrderDocument } from './schemas/order.schema';

import { CreateOrderDto } from './dto/create-order.dto';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(Order.name)
    private orderModel: Model<OrderDocument>,
  ) {}

  async createOrder(dto: any) {
    return this.orderModel.create({
      ...dto,
      status: 'Pending',
      paymentStatus: 'unpaid',
    });
  }

  async getUserOrders(userId: string) {
    return this.orderModel.find({
      userId,
    });
  }

  async getAllOrders() {
    return this.orderModel.find().sort({
      createdAt: -1,
    });
  }

  async updateStatus(id: string, status: string) {
    return this.orderModel.findByIdAndUpdate(
      id,
      {
        status,
      },
      {
        new: true,
      },
    );
  }
}
