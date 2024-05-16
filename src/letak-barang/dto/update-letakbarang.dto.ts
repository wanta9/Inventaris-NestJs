import { PartialType } from '@nestjs/mapped-types';
import { CreateLetakBarangDto } from './create-letak-barang.dto';

export class UpdateLetakBarangDto extends PartialType(CreateLetakBarangDto) {}
