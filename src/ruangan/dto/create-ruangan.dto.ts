import { IsNotEmpty } from 'class-validator';

export class CreateRuanganDto {
  @IsNotEmpty()
  Letak_Barang: string;
}
