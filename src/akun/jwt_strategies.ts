import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import * as dotenv from 'dotenv';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Akun } from './entities/akun.entity';

dotenv.config();

@Injectable()
export class JwtSrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(Akun)
    private userRepository: Repository<Akun>,
  ) {
    super({
      secretOrKey: '123',
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }
  async validate(payload: any) {
    const exisUserData = await this.userRepository.findOne({
      where: { username: payload.exisUser.username },
    });
    if (!exisUserData) {
      throw new HttpException(
        {
          statusCode: HttpStatus.UNAUTHORIZED,
          massage: 'UNAUTHORIZED',
          data: 'Token Is Invalid',
        },
        HttpStatus.UNAUTHORIZED,
      );
    }
    return exisUserData;
  }
}
