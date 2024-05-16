import { IsNotEmpty } from 'class-validator';

export class CreatePeminjamanBarangDto {
  @IsNotEmpty()
  ruanganBarangId: string;

  @IsNotEmpty()
  peminjamanId: string;

  @IsNotEmpty()
  jumlah: number;
}
