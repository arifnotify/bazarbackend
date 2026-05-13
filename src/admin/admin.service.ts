import { BadRequestException, Injectable } from '@nestjs/common';

import { InjectModel } from '@nestjs/mongoose';

import { JwtService } from '@nestjs/jwt';

import * as bcrypt from 'bcryptjs';

import { Model } from 'mongoose';

import { Admin, AdminDocument } from './schemas/admin.schema';

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(Admin.name)
    private adminModel: Model<AdminDocument>,

    private jwtService: JwtService,
  ) {}

  async createDefaultAdmin() {
    const admin = await this.adminModel.findOne({
      email: 'admin@gmail.com',
    });

    if (!admin) {
      const hashedPassword = await bcrypt.hash('123456', 10);

      await this.adminModel.create({
        email: 'admin@gmail.com',
        password: hashedPassword,
      });

      console.log('Default Admin Created');
    }
  }

  async login(email: string, password: string) {
    const admin = await this.adminModel.findOne({
      email,
    });

    if (!admin) {
      throw new BadRequestException('Admin Not Found');
    }

    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
      throw new BadRequestException('Invalid Password');
    }

    const token = this.jwtService.sign({
      id: admin._id,
      email: admin.email,
      role: admin.role,
    });

    return {
      success: true,
      token,
      admin,
    };
  }
}
