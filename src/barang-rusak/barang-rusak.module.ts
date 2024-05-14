import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BarangRusakController } from './barang-rusak.controller';
import { BarangRusakService } from './barang-rusak.service';
import { BarangRusak } from './entities/barang-rusak.entity';
import { RuanganBarang } from '#/ruangan-barang/entities/ruangan-barang.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BarangRusak, RuanganBarang])],
  controllers: [BarangRusakController],
  providers: [BarangRusakService],
})
export class BarangRusakModule {}
