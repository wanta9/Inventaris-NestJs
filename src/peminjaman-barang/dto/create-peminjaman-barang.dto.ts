import { IsNotEmpty } from 'class-validator';

export class CreatePeminjamanBarangDto {
  @IsNotEmpty()
  jumlah: number;
}
