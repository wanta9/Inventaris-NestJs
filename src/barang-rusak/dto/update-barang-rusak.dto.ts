import { PartialType } from '@nestjs/mapped-types';
import { CreateBarangRusakDto } from './create-barang-rusak.dto';

export class UpdateBarangRusakDto extends PartialType(CreateBarangRusakDto) {}
