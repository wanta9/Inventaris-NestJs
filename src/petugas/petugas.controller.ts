import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  ParseUUIDPipe,
  HttpStatus,
} from '@nestjs/common';
import { PetugasService } from './petugas.service';
import { CreatePetugasDto } from './dto/create-petugas.dto';
import { UpdatePetugasDto } from './dto/update-petugas.dto';

@Controller('petugas')
export class PetugasController {
  constructor(private readonly petugasService: PetugasService) {}
  @Post()
  async create(@Body() CreatepetugasDto: CreatePetugasDto) {
    return {
      data: await this.petugasService.create(CreatepetugasDto),
      statusCode: HttpStatus.CREATED,
      message: 'success',
    };
  }
  @Get()
  async findAll() {
    const [data, count] = await this.petugasService.findAll();

    return {
      data,
      count,
      statusCode: HttpStatus.OK,
      message: 'success',
    };
  }

  @Put(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updatePetugasDto: UpdatePetugasDto,
  ) {
    return {
      data: await this.petugasService.update(id, updatePetugasDto),
      statusCode: HttpStatus.OK,
      message: 'success',
    };
  }

  @Delete(':id')
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    await this.petugasService.remove(id);

    return {
      statusCode: HttpStatus.OK,
      message: 'success',
    };
  }
}
