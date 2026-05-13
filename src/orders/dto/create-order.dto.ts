import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateOrderDto {
  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsNotEmpty()
  items: any[];

  @IsNumber()
  totalAmount: number;

  @IsString()
  address: string;

  @IsString()
  phone: string;
}
