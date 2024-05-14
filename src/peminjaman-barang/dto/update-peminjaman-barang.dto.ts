import { PartialType } from '@nestjs/mapped-types';
import { CreatePeminjamanBarangDto } from './create-peminjaman-barang.dto';

export class UpdatePeminjamanBarangDto extends PartialType(
  CreatePeminjamanBarangDto,
) {}
