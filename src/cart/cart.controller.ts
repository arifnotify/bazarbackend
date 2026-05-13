import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

import { CartService } from './cart.service';

import { AddCartDto } from './dto/add-cart.dto';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post('add')
  addToCart(@Body() dto: AddCartDto) {
    return this.cartService.addToCart(dto);
  }

  @Get(':userId')
  getUserCart(@Param('userId') userId: string) {
    return this.cartService.getUserCart(userId);
  }

  @Delete(':id')
  removeItem(@Param('id') id: string) {
    return this.cartService.removeItem(id);
  }

  @Delete('clear/:userId')
  clearCart(@Param('userId') userId: string) {
    return this.cartService.clearCart(userId);
  }

  @Patch('update/:id')
  updateQuantity(@Param('id') id: string, @Body('quantity') quantity: number) {
    return this.cartService.updateQuantity(id, quantity);
  }
}
