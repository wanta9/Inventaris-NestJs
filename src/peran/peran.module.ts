import { Module } from '@nestjs/common';
import { PeranController } from './peran.controller';
import { peranService } from './peran.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Peran } from './entities/peran.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Peran])],
  controllers: [PeranController],
  providers: [peranService],
})
export class PeranModule {}
