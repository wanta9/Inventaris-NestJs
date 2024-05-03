import { Module } from '@nestjs/common';
import { RuanganController } from './ruangan.controller';
import { ruanganService } from './ruangan.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ruangan } from './entities/ruangan.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Ruangan])],
  controllers: [RuanganController],
  providers: [ruanganService],
})
export class RuanganModule {}
