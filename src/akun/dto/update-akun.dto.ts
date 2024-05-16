import { PartialType } from '@nestjs/mapped-types';
import { CreateAkunDto } from './create-akun.dto';

export class UpdateAkunDto extends PartialType(CreateAkunDto) {}
