import { Module } from '@nestjs/common';
import { PeminjamController } from './peminjam.controller';
import { PeminjamService } from './peminjam.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Peminjam } from './entities/peminjam.entity';
import { Akun } from '#/akun/entities/akun.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Peminjam, Akun])],
  controllers: [PeminjamController],
  providers: [PeminjamService],
})
export class PeminjamModule {}
