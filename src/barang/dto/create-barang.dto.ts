import { IsNotEmpty } from 'class-validator';

export class CreateBarangDto {
  @IsNotEmpty()
  nama: string;

  @IsNotEmpty()
  gambar: string;

  @IsNotEmpty()
  kondisi: string;

  @IsNotEmpty()
  deskripsi: string;

  @IsNotEmpty()
  jumlah: number;

  @IsNotEmpty()
  harga: number;
}
