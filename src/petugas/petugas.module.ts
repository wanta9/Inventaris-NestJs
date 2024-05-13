import { Module } from '@nestjs/common';
import { PetugasController } from './petugas.controller';
import { PetugasService } from './petugas.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Petugas } from './entities/petugas.entity';
import { Akun } from '#/akun/entities/akun.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Petugas, Akun])],
  controllers: [PetugasController],
  providers: [PetugasService],
})
export class PetugasModule {}
