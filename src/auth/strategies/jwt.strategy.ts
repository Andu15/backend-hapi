import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

import { Strategy, ExtractJwt } from 'passport-jwt';
import { PayloadToken } from '../models/token.model';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'my proyect hapi',
    });
  }

  async validate(payload: PayloadToken) {
    return payload;
  }
}
