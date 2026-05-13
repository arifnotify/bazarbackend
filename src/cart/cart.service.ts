import { Injectable } from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';

import { Cart, CartDocument } from './schemas/cart.schema';

import { AddCartDto } from './dto/add-cart.dto';

@Injectable()
export class CartService {
  constructor(
    @InjectModel(Cart.name)
    private cartModel: Model<CartDocument>,
  ) {}

  async addToCart(dto: AddCartDto) {
    const existing = await this.cartModel.findOne({
      userId: dto.userId,
      productId: dto.productId,
    });

    if (existing) {
      existing.quantity += dto.quantity;
      existing.totalPrice = existing.quantity * existing.price;

      return existing.save();
    }

    return this.cartModel.create({
      ...dto,
      totalPrice: dto.price * dto.quantity,
    });
  }

  async getUserCart(userId: string) {
    return this.cartModel.find({
      userId,
    });
  }

  async removeItem(id: string) {
    return this.cartModel.findByIdAndDelete(id);
  }

  async clearCart(userId: string) {
    return this.cartModel.deleteMany({
      userId,
    });
  }

  async updateQuantity(id: string, quantity: number) {
    const cart = await this.cartModel.findById(id);

    cart!.quantity = quantity;
    cart!.totalPrice = cart!.price * quantity;

    return cart!.save();
  }
}
