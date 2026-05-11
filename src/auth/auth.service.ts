import { BadRequestException, Injectable } from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';

import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(phone: string) {
    let user = await this.usersService.findByPhone(phone);

    if (!user) {
      user = await this.usersService.createUser(phone);
    }

    const otp = Math.floor(1000 + Math.random() * 9000).toString();

    await this.usersService.saveOtp(phone, otp);

    console.log('OTP:', otp);

    return {
      success: true,
      message: 'OTP Sent Successfully',
    };
  }

  async verifyOtp(phone: string, otp: string) {
    const user = await this.usersService.findByPhone(phone);

    if (!user) {
      throw new BadRequestException('User Not Found');
    }

    if (user.otp !== otp) {
      throw new BadRequestException('Invalid OTP');
    }

    await this.usersService.verifyUser(phone);

    const token = this.jwtService.sign({
      id: user._id,
      phone: user.phone,
      role: user.role,
    });

    return {
      success: true,
      token,
      user,
    };
  }
}
