import { IsNotEmpty } from 'class-validator';

export class CreateLetakBarangDto {
  @IsNotEmpty()
  letakbarang: string;
}
