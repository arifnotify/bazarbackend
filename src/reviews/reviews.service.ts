import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import { Review, ReviewDocument } from './schemas/review.schema';
import { CreateReviewDto } from './dto/create-review.dto';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectModel(Review.name)
    private reviewModel: Model<ReviewDocument>,

    private productService: any,
  ) {}

  // Add Review
  async addReview(dto: CreateReviewDto) {
    // Create review
    const review = await this.reviewModel.create(dto);

    // Update product review count
    await this.reviewModel.db.collection('products').updateOne(
      {
        _id: new Types.ObjectId(dto.productId),
      },
      {
        $inc: {
          numReviews: 1,
        },
      },
    );

    return review;
  }

  // Get All Reviews of a Product
  async getProductReviews(productId: string) {
    return this.reviewModel.find({
      productId,
    });
  }

  // Delete Review
  async deleteReview(id: string) {
    return this.reviewModel.findByIdAndDelete(id);
  }
}
