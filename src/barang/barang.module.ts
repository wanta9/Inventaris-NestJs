import { Module } from '@nestjs/common';
import { BarangController } from './barang.controller';
import { BarangService } from './barang.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Barang } from './entities/barang.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Barang])],
  providers: [BarangService],
  controllers: [BarangController],
})
export class BarangModule {}
