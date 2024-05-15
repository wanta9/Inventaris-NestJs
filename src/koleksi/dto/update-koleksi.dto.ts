import { PartialType } from '@nestjs/mapped-types';
import { CreateKoleksiDto } from './create-koleksi.dto';

export class UpdateKoleksiDto extends PartialType(CreateKoleksiDto) {}
