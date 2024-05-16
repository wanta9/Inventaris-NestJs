import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LetakBarangService } from './letak-barang.service';
import { LetakBarangController } from './letak-barang.controller';
import { LetakBarang } from './entities/letak-barang.entity';

@Module({
  imports: [TypeOrmModule.forFeature([LetakBarang])],
  controllers: [LetakBarangController],
  providers: [LetakBarangService],
})
export class LetakBarangModule {}
