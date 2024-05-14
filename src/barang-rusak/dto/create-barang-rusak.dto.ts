import { IsNotEmpty } from 'class-validator';

export class CreateBarangRusakDto {
  @IsNotEmpty()
  ruanganBarangId: string;

  @IsNotEmpty()
  kode: string;

  @IsNotEmpty()
  jumlah: number;

  @IsNotEmpty()
  status: string;

  @IsNotEmpty()
  keterangan: string;

  @IsNotEmpty()
  tanggalRusak: Date;

  @IsNotEmpty()
  tanggalPerbaikan: Date;
}
