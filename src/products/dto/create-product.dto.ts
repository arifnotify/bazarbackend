import {
  IsArray,
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber()
  price: number;

  @IsOptional()
  @IsNumber()
  discountPrice: number;

  @IsString()
  @IsNotEmpty()
  image: string;

  @IsOptional()
  @IsArray()
  images: string[];

  @IsString()
  @IsNotEmpty()
  category: string;

  @IsOptional()
  @IsNumber()
  stock: number;

  @IsOptional()
  @IsBoolean()
  featured: boolean;

  @IsOptional()
  @IsArray()
  tags: string[];
}
