import { PartialType } from '@nestjs/mapped-types';
import { CreateRuanganBarangDto } from './create-ruangan-barang.dto';

export class UpdateRuanganBarangDto extends PartialType(
  CreateRuanganBarangDto,
) {}
