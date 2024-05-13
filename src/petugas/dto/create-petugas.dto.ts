import { IsNotEmpty } from 'class-validator';

export class CreatePetugasDto {
  @IsNotEmpty()
  akunId: string;

  @IsNotEmpty()
  NIP: string;
}
