import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BarangKeluarController } from './barang-keluar.controller';
import { BarangKeluarService } from './barang-keluar.service';
import { BarangKeluar } from './entities/barang-keluar.entity';
import { RuanganBarang } from '#/ruangan-barang/entities/ruangan-barang.entity';
@Module({
  imports: [TypeOrmModule.forFeature([BarangKeluar, RuanganBarang])],
  controllers: [BarangKeluarController],
  providers: [BarangKeluarService],
})
export class BarangKeluarModule {}
