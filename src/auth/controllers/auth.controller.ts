import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { AuthGuard } from '@nestjs/passport';

import { AuthService } from '../services/auth.service';
import { User } from '../../users/schemas/user.schema';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // API de autenticación con correo y contraseña
  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Req() req: Request) {
    const user = req.user as User;
    return this.authService.generateJWT(user);
  }
}
