import { Module } from '@nestjs/common';
import { PeminjamanBarangController } from './peminjaman-barang.controller';
import { PeminjamanBarangService } from './peminjaman-barang.service';

@Module({
  controllers: [PeminjamanBarangController],
  providers: [PeminjamanBarangService]
})
export class PeminjamanBarangModule {}
