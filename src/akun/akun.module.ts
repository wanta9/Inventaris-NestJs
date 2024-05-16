import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Akun } from './entities/akun.entity';
import { AkunController } from './akun.controller';
import { AkunService } from './akun.service';
import { Peran } from '#/peran/entities/peran.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { JwtSrategy } from './jwt_strategies';

@Module({
  imports: [
    TypeOrmModule.forFeature([Akun, Peran]),
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
    JwtModule.register({
      secret: '123',
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [AkunController],
  providers: [AkunService, JwtSrategy, JwtService],
  exports: [JwtSrategy],
})
export class AkunModule {}
