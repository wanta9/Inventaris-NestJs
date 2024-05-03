import { IsNotEmpty } from 'class-validator';
import { Transform, TransformFnParams } from 'class-transformer';

export class CreatePeranDto {
  @IsNotEmpty()
  @Transform(({ value }: TransformFnParams) =>
    value ? value.toLowerCase() : value,
  )
  Peran: string;
}
