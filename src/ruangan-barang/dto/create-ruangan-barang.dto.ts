import { IsNotEmpty } from 'class-validator';

export class CreateRuanganBarangDto {
  @IsNotEmpty()
  barangId: string;

  @IsNotEmpty()
  ruanganId: string;

  @IsNotEmpty()
  jumlah: number;
}
