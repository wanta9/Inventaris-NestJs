import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RuanganBarangController } from './ruangan-barang.controller';
import { ruanganBarangService } from './ruangan-barang.service';
import { RuanganBarang } from './entities/ruangan-barang.entity';
import { Ruangan } from '#/ruangan/entities/ruangan.entity';
import { Barang } from '#/barang/entities/barang.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RuanganBarang, Ruangan, Barang])],
  controllers: [RuanganBarangController],
  providers: [ruanganBarangService],
})
export class RuanganBarangModule {}
