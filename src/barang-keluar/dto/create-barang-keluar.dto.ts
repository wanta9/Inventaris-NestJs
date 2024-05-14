import { IsNotEmpty } from 'class-validator';

export class CreateBarangKeluarDto {
  @IsNotEmpty()
  ruanganBarangId: string;

  @IsNotEmpty()
  kode: string;

  @IsNotEmpty()
  jumlah: number;

  @IsNotEmpty()
  keterangan: string;

  @IsNotEmpty()
  tanggalKeluar: Date;
}
