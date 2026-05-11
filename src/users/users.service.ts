import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';

import { Model } from 'mongoose';

import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
  ) {}

  async findByPhone(phone: string) {
    return this.userModel.findOne({ phone });
  }

  async createUser(phone: string) {
    return this.userModel.create({
      phone,
    });
  }

  async saveOtp(phone: string, otp: string) {
    return this.userModel.findOneAndUpdate({ phone }, { otp }, { new: true });
  }

  async verifyUser(phone: string) {
    return this.userModel.findOneAndUpdate(
      { phone },
      {
        isVerified: true,
        otp: '',
      },
      { new: true },
    );
  }

  async getAllUsers() {
    return this.userModel.find().sort({
      createdAt: -1,
    });
  }
}
