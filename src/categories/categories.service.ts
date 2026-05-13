import { Injectable } from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';

import { Category, CategoryDocument } from './schemas/category.schema';

import { CreateCategoryDto } from './dto/create-category.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel(Category.name)
    private categoryModel: Model<CategoryDocument>,
  ) {}

  async createCategory(dto: CreateCategoryDto) {
    return this.categoryModel.create(dto);
  }

  async getCategories() {
    return this.categoryModel.find().sort({
      createdAt: -1,
    });
  }

  async getSingleCategory(id: string) {
    return this.categoryModel.findById(id);
  }

  async updateCategory(id: string, dto: CreateCategoryDto) {
    return this.categoryModel.findByIdAndUpdate(id, dto, {
      new: true,
    });
  }

  async deleteCategory(id: string) {
    return this.categoryModel.findByIdAndDelete(id);
  }
}
