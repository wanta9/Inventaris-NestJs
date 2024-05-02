import { Module } from '@nestjs/common';
import { PeminjamController } from './peminjam.controller';
import { PeminjamService } from './peminjam.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Peminjam } from './entities/peminjam.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Peminjam])],
  controllers: [PeminjamController],
  providers: [PeminjamService],
})
export class PeminjamModule {}
