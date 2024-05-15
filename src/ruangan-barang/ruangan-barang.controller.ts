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
import { ruanganBarangService } from './ruangan-barang.service';
import { CreateRuanganBarangDto } from './dto/create-ruangan-barang.dto';
import { UpdateRuanganBarangDto } from './dto/update-ruangan-barang.dto';

@Controller('ruanganBarang')
export class RuanganBarangController {
  constructor(private readonly ruanganBarangService: ruanganBarangService) {}
  @Post()
  async create(@Body() CreateRuanganBarangDto: CreateRuanganBarangDto) {
    return {
      data: await this.ruanganBarangService.create(CreateRuanganBarangDto),
      statusCode: HttpStatus.CREATED,
      message: 'success',
    };
  }
  @Get()
  async findAll() {
    const [data, count] = await this.ruanganBarangService.findAll();

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
    @Body() UpdateRuanganBarangDto: UpdateRuanganBarangDto,
  ) {
    return {
      data: await this.ruanganBarangService.update(id, UpdateRuanganBarangDto),
      statusCode: HttpStatus.OK,
      message: 'success',
    };
  }

  @Delete(':id')
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    await this.ruanganBarangService.remove(id);

    return {
      statusCode: HttpStatus.OK,
      message: 'success',
    };
  }
}