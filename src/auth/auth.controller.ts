import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDTO } from './dto/AuthDTO';
import { LocalAuthGuard } from './LocalAuthGuard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body() authDto: AuthDTO) {
    return this.authService.register(authDto.email, authDto.password);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }
}
