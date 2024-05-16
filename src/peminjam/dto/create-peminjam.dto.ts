import { IsNotEmpty } from 'class-validator';

export class CreatePeminjamDto {
  @IsNotEmpty()
  akunId: string;

  @IsNotEmpty()
  NISN: number;

  @IsNotEmpty()
  kelas: string;
}
