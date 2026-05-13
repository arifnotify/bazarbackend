import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type OrderDocument = Order & Document;

@Schema({
  timestamps: true,
})
export class Order {
  @Prop({
    required: true,
  })
  userId: string;

  @Prop({
    required: true,
  })
  items: any[];

  @Prop({
    required: true,
  })
  totalAmount: number;

  @Prop({
    default: 'Pending',
  })
  status: string;

  @Prop({
    default: '',
  })
  address: string;

  @Prop({
    default: '',
  })
  phone: string;

  @Prop({
  default: 'unpaid',
  })
  paymentStatus: string;

  @Prop({
    default: 'COD',
  })
  paymentMethod: string;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
