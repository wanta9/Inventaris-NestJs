import { IsNotEmpty } from 'class-validator';

export class CreateKoleksiDto {
  @IsNotEmpty()
  ruanganBarangId: string;

  @IsNotEmpty()
  peminjamanBarangId: string;

  @IsNotEmpty()
  jumlah: number;
}
