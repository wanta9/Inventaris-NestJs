import { IsNotEmpty } from 'class-validator';

export class CreatePeminjamDto {
  @IsNotEmpty()
  NISN: number;

  @IsNotEmpty()
  kelas: string;
}
