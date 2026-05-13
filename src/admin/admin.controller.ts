import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';

import { AdminService } from './admin.service';

import { AdminLoginDto } from './dto/admin-login.dto';

import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';

import { RolesGuard } from '../common/guards/roles.guard';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {
    void this.adminService.createDefaultAdmin();
  }

  @Post('login')
  login(@Body() dto: AdminLoginDto) {
    return this.adminService.login(dto.email, dto.password);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('dashboard')
  dashboard() {
    return {
      success: true,
      message: 'Welcome Admin Dashboard',
    };
  }
}
