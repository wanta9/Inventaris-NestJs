import { IsNotEmpty } from 'class-validator';
import { Transform, TransformFnParams } from 'class-transformer';

export class CreateBarangDto {
  @IsNotEmpty()
  kode: string;

  @IsNotEmpty()
  nama: string;

  @IsNotEmpty()
  gambar: string;

  @IsNotEmpty()
  @Transform(({ value }: TransformFnParams) =>
    value ? value.toLowerCase() : value,
  )
  kondisi: string;

  @IsNotEmpty()
  deskripsi: string;

  @IsNotEmpty()
  jumlah: number;

  @IsNotEmpty()
  harga: number;
}
