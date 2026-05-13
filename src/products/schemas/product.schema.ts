import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProductDocument = Product & Document;

@Schema({
  timestamps: true,
})
export class Product {
  @Prop({
    required: true,
  })
  name: string;

  @Prop({
    required: true,
  })
  description: string;

  @Prop({
    required: true,
  })
  price: number;

  @Prop({
    default: 0,
  })
  discountPrice: number;

  @Prop({
    required: true,
  })
  image: string;

  @Prop({
    default: [],
  })
  images: string[];

  @Prop({
    required: true,
  })
  category: string;

  @Prop({
    default: 0,
  })
  stock: number;

  @Prop({
    default: false,
  })
  featured: boolean;

  @Prop({
    default: true,
  })
  isActive: boolean;

  @Prop({
  default: 0,
  })
  rating: number;

  @Prop({
    default: 0,
  })
  numReviews: number;

  @Prop({
    default: [],
  })
  tags: string[];
}

export const ProductSchema = SchemaFactory.createForClass(Product);
