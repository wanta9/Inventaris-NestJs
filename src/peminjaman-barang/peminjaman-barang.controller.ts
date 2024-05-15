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
import { PeminjamanBarangService } from './peminjaman-barang.service';
import { CreatePeminjamanBarangDto } from './dto/create-peminjaman-barang.dto';
import { UpdatePeminjamanBarangDto } from './dto/update-peminjaman-barang.dto';

@Controller('peminjamanBarang')
export class PeminjamanBarangController {
  constructor(
    private readonly peminjamanBarangService: PeminjamanBarangService,
  ) {}
  @Post()
  async create(@Body() CreatepeminjamanBarangDto: CreatePeminjamanBarangDto) {
    return {
      data: await this.peminjamanBarangService.create(
        CreatepeminjamanBarangDto,
      ),
      statusCode: HttpStatus.CREATED,
      message: 'success',
    };
  }
  @Get()
  async findAll() {
    const [data, count] = await this.peminjamanBarangService.findAll();

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
    @Body() UpdatepeminjamanBarangDto: UpdatePeminjamanBarangDto,
  ) {
    return {
      data: await this.peminjamanBarangService.update(
        id,
        UpdatepeminjamanBarangDto,
      ),
      statusCode: HttpStatus.OK,
      message: 'success',
    };
  }

  @Delete(':id')
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    await this.peminjamanBarangService.remove(id);

    return {
      statusCode: HttpStatus.OK,
      message: 'success',
    };
  }
}
