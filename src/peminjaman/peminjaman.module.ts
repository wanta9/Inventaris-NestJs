import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { PeminjamanController } from './peminjaman.controller';
import { PeminjamanService } from './peminjaman.service';
import { Peminjam } from '#/peminjam/entities/peminjam.entity';
import { Peminjaman } from '#/peminjaman/entities/peminjaman.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Peminjam, Peminjaman])],
  controllers: [PeminjamanController],
  providers: [PeminjamanService],
})
export class PeminjamanModule {}
