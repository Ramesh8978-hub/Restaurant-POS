import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy, VerifiedCallback } from 'passport-jwt';
import { jwtConstants } from './constants';
import { UserService } from '../user/user.service';

@Injectable()
export class JwtStrategyService extends PassportStrategy(Strategy){
  constructor(@Inject(UserService) private userService:UserService) {
    super({
      jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration:false,
      secretOrKey:jwtConstants.secret
    });
  }

  async validate(payload: any,done:VerifiedCallback){
    const user = await this.userService.validateUserById(payload.id)
    if(!user){
      throw new UnauthorizedException(`Unauthorized Request without token`)
    }else {
      done(null,payload,payload.iat)
    }
  }
}