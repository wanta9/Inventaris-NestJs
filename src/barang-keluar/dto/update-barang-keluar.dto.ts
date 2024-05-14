import { PartialType } from '@nestjs/mapped-types';
import { CreateBarangKeluarDto } from './create-barang-keluar.dto';

export class UpdateBarangKeluarDto extends PartialType(CreateBarangKeluarDto) {}
