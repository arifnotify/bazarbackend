import { Body, Controller, Post } from '@nestjs/common';

import { AuthService } from './auth.service';
import { SendOtpDto } from 'src/users/dto/send-otp.dto';
import { VerifyOtpDto } from 'src/users/dto/verify-otp.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('send-otp')
  sendOtp(@Body() dto: SendOtpDto) {
    return this.authService.sendOtp(dto.phone);
  }

  @Post('verify-otp')
  verifyOtp(@Body() dto: VerifyOtpDto) {
    return this.authService.verifyOtp(dto.phone, dto.otp);
  }
}
