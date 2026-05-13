import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';

import { ReviewsService } from './reviews.service';

import { CreateReviewDto } from './dto/create-review.dto';

import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';

@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  addReview(@Body() dto: CreateReviewDto) {
    return this.reviewsService.addReview(dto);
  }

  @Get(':productId')
  getProductReviews(@Param('productId') productId: string) {
    return this.reviewsService.getProductReviews(productId);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  deleteReview(@Param('id') id: string) {
    return this.reviewsService.deleteReview(id);
  }
}
