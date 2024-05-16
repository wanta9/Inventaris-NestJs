import { PartialType } from '@nestjs/mapped-types';
import { CreateBarangMasukDto } from './create-barang-masuk.dto';

export class UpdateBarangMasukDto extends PartialType(CreateBarangMasukDto) {}
