import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({
  timestamps: true,
})
export class User {
  @Prop({
    required: true,
    unique: true,
  })
  phone!: string;

  @Prop({
    default: '',
  })
  name!: string;

  @Prop({
    default: '',
  })
  email!: string;

  @Prop({
    default: '',
  })
  image!: string;

  @Prop({
    default: false,
  })
  isVerified!: boolean;

  @Prop({
    default: '',
  })
  otp!: string;

  @Prop({
    default: '',
  })
  address!: string;

  @Prop({
    default: 'user',
  })
  role!: string;

  @Prop({
    default: true,
  })
  isActive!: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
