import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';

import { OrdersService } from './orders.service';

import { CreateOrderDto } from './dto/create-order.dto';

import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';

import { RolesGuard } from '../common/guards/roles.guard';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  createOrder(@Body() dto: CreateOrderDto) {
    return this.ordersService.createOrder(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':userId')
  getUserOrders(@Param('userId') userId: string) {
    return this.ordersService.getUserOrders(userId);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get()
  getAllOrders() {
    return this.ordersService.getAllOrders();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch(':id')
  updateStatus(@Param('id') id: string, @Body('status') status: string) {
    return this.ordersService.updateStatus(id, status);
  }
}
