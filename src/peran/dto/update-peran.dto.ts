import { PartialType } from '@nestjs/mapped-types';
import { CreatePeranDto } from './create-peran.dto';

export class UpdatePeranDto extends PartialType(CreatePeranDto) {}
