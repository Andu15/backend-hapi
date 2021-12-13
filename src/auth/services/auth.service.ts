import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

import { UsersService } from '../../users/services/users.service';
import { User } from '../../users/schemas/user.schema';
import { PayloadToken } from '../models/token.model';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);
    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        const { password, ...result } = user.toJSON();
        return result;
      }
    }
    return null;
  }

  async validateUserById(email: string) {
    const user = await this.usersService.findByEmail(email);
    return user;
  }

  generateJWT(user: User) {
    const payload: PayloadToken = {
      name: user.email,
      sub: user.id,
      userId: user.id,
    };
    return {
      access_token: this.jwtService.sign(payload),
      user,
    };
  }
}
