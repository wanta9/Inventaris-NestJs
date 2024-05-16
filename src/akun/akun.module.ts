import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Akun } from './entities/akun.entity';
import { AkunController } from './akun.controller';
import { AkunService } from './akun.service';
import { Peran } from '#/peran/entities/peran.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Akun, Peran])],
  controllers: [AkunController],
  providers: [AkunService],
})
export class AkunModule {}
