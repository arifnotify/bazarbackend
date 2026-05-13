import { Injectable } from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';

import { Product, ProductDocument } from './schemas/product.schema';

import { CreateProductDto } from './dto/create-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name)
    private productModel: Model<ProductDocument>,
  ) {}

  async createProduct(dto: CreateProductDto) {
    return this.productModel.create(dto);
  }

  async getProducts() {
    return this.productModel.find().sort({
      createdAt: -1,
    });
  }

  async getSingleProduct(id: string) {
    return this.productModel.findById(id);
  }

  async updateProduct(id: string, dto: CreateProductDto) {
    return this.productModel.findByIdAndUpdate(id, dto, {
      new: true,
    });
  }

  async deleteProduct(id: string) {
    return this.productModel.findByIdAndDelete(id);
  }

  async featuredProducts() {
    return this.productModel.find({
      featured: true,
    });
  }

  async searchProducts(keyword: string) {
    return this.productModel.find({
      name: {
        $regex: keyword,
        $options: 'i',
      },
    });
  }

  async productsByCategory(category: string) {
    return this.productModel.find({
      category,
    });
  }

  async paginatedProducts(page: number, limit: number) {
    const skip = (page - 1) * limit;

    const products = await this.productModel
      .find()
      .skip(skip)
      .limit(limit)
      .sort({
        createdAt: -1,
      });

    const total = await this.productModel.countDocuments();

    return {
      total,
      page,
      limit,
      products,
    };
  }

  async latestProducts() {
    return this.productModel
      .find()
      .sort({
        createdAt: -1,
      })
      .limit(10);
  }

  async relatedProducts(category: string, productId: string) {
    return this.productModel.find({
      category,
      _id: {
        $ne: productId,
      },
    });
  }

  async sortedProducts(sort: string) {
    let sortOption = {};

    if (sort === 'low') {
      sortOption = {
        price: 1,
      };
    }

    if (sort === 'high') {
      sortOption = {
        price: -1,
      };
    }

    if (sort === 'latest') {
      sortOption = {
        createdAt: -1,
      };
    }

    return this.productModel.find().sort(sortOption);
  }

  async updateRating(productId: string) {
    const reviews = await this.productModel.db
      .collection('reviews')
      .find({ productId })
      .toArray();

    let total = 0;

    reviews.forEach((r) => {
      total += r.rating;
    });

    const avg = reviews.length > 0 ? total / reviews.length : 0;

    return this.productModel.findByIdAndUpdate(productId, {
      rating: avg,
      numReviews: reviews.length,
    });
  }
}
