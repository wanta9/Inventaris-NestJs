import { IsNotEmpty } from 'class-validator';

export class CreateBarangMasukDto {
  @IsNotEmpty()
  ruanganBarangId: string;

  @IsNotEmpty()
  kode: string;

  @IsNotEmpty()
  jumlah: number;

  @IsNotEmpty()
  harga: number;

  @IsNotEmpty()
  keterangan: string;

  @IsNotEmpty()
  tanggalMasuk: Date;
}
