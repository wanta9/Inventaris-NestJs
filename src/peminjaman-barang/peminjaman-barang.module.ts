import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PeminjamanBarangController } from './peminjaman-barang.controller';
import { PeminjamanBarangService } from './peminjaman-barang.service';
import { PeminjamanBarang } from './entities/peminjaman-barang.entity';
import { RuanganBarang } from '../ruangan-barang/entities/ruangan-barang.entity';
import { Peminjaman } from '#/peminjaman/entities/peminjaman.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([PeminjamanBarang, RuanganBarang, Peminjaman]),
  ],
  controllers: [PeminjamanBarangController],
  providers: [PeminjamanBarangService],
})
export class PeminjamanBarangModule {}
