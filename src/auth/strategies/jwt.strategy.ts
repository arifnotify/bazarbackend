import { Injectable } from '@nestjs/common';

import { PassportStrategy } from '@nestjs/passport';

import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),

      ignoreExpiration: false,

      secretOrKey: process.env.JWT_SECRET || 'supersecretjwt',
    });
  }

  validate(payload: {
    id?: string;
    _id?: string;
    sub?: string;
    phone: string;
    role: string;
  }) {
    return {
      userId: payload.id || payload._id || payload.sub,
      phone: payload.phone,
      role: payload.role,
    };
  }
}
