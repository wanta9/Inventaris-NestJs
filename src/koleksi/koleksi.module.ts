import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { KoleksiController } from './koleksi.controller';
import { KoleksiService } from './koleksi.service';
import { Koleksi } from './entities/koleksi.entity';
import { RuanganBarang } from '../ruangan-barang/entities/ruangan-barang.entity';
import { PeminjamanBarang } from '../peminjaman-barang/entities/peminjaman-barang.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Koleksi, RuanganBarang, PeminjamanBarang]),
  ],
  controllers: [KoleksiController],
  providers: [KoleksiService],
})
export class KoleksiModule {}
