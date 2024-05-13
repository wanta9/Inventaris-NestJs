import { IsNotEmpty } from 'class-validator';
import { Transform, TransformFnParams } from 'class-transformer';

export class CreateAkunDto {
  @IsNotEmpty()
  peranId: string;

  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  nama: string;

  @IsNotEmpty()
  gambar: string;

  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  telp: string;

  @IsNotEmpty()
  @Transform(({ value }: TransformFnParams) =>
    value ? value.toLowerCase() : value,
  )
  status: string;

  @IsNotEmpty()
  isOnline: boolean;
}
