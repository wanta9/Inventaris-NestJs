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
  UseGuards,
} from '@nestjs/common';
import { PeminjamanBarangService } from './peminjaman-barang.service';
import { CreatePeminjamanBarangDto } from './dto/create-peminjaman-barang.dto';
import { UpdatePeminjamanBarangDto } from './dto/update-peminjaman-barang.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('peminjamanBarang')
export class PeminjamanBarangController {
  constructor(
    private readonly peminjamanBarangService: PeminjamanBarangService,
  ) {}
  @Post()
  @UseGuards(AuthGuard('jwt'))
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
  @UseGuards(AuthGuard('jwt'))
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
  @UseGuards(AuthGuard('jwt'))
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
  @UseGuards(AuthGuard('jwt'))
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    await this.peminjamanBarangService.remove(id);

    return {
      statusCode: HttpStatus.OK,
      message: 'success',
    };
  }
}
