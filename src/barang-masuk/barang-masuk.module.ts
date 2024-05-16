import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BarangMasukController } from './barang-masuk.controller';
import { BarangMasukService } from './barang-masuk.service';
import { BarangMasuk } from './entities/barang-masuk.entity';
import { RuanganBarang } from '#/ruangan-barang/entities/ruangan-barang.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BarangMasuk, RuanganBarang])],
  controllers: [BarangMasukController],
  providers: [BarangMasukService],
})
export class BarangMasukModule {}
