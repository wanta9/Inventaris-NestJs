import { PartialType } from '@nestjs/mapped-types';
import { CreatePeminjamanDto } from './create-peminjaman.dto';

export class UpdatePeminjamanDto extends PartialType(CreatePeminjamanDto) {}
