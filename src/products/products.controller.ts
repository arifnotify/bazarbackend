import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';

import { ProductsService } from './products.service';

import { CreateProductDto } from './dto/create-product.dto';

import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';

import { RolesGuard } from '../common/guards/roles.guard';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  getProducts() {
    return this.productsService.getProducts();
  }

  @Get('featured')
  featuredProducts() {
    return this.productsService.featuredProducts();
  }

  @Get('search')
  searchProducts(@Query('keyword') keyword: string) {
    return this.productsService.searchProducts(keyword);
  }

  @Get(':id')
  getSingleProduct(@Param('id') id: string) {
    return this.productsService.getSingleProduct(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  createProduct(@Body() dto: CreateProductDto) {
    return this.productsService.createProduct(dto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch(':id')
  updateProduct(@Param('id') id: string, @Body() dto: CreateProductDto) {
    return this.productsService.updateProduct(id, dto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Delete(':id')
  deleteProduct(@Param('id') id: string) {
    return this.productsService.deleteProduct(id);
  }

  @Get('category/:name')
  productsByCategory(@Param('name') name: string) {
    return this.productsService.productsByCategory(name);
  }

  @Get('pagination/all')
  paginationProducts(@Query('page') page = 1, @Query('limit') limit = 10) {
    return this.productsService.paginatedProducts(Number(page), Number(limit));
  }

  @Get('latest/all')
  latestProducts() {
    return this.productsService.latestProducts();
  }

  @Get('related/:category/:id')
  relatedProducts(
    @Param('category') category: string,
    @Param('id') id: string,
  ) {
    return this.productsService.relatedProducts(category, id);
  }

  @Get('sort/all')
  sortedProducts(@Query('type') type: string) {
    return this.productsService.sortedProducts(type);
  }
}
