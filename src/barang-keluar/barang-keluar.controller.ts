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
import { BarangKeluarService } from './barang-keluar.service';
import { CreateBarangKeluarDto } from './dto/create-barang-keluar.dto';
import { UpdateBarangKeluarDto } from './dto/update-barang-keluar.dto';

@Controller('barangKeluar')
export class BarangKeluarController {
  constructor(private readonly barangKeluarService: BarangKeluarService) {}
  @Post()
  async create(@Body() CreateBarangKeluarDto: CreateBarangKeluarDto) {
    return {
      data: await this.barangKeluarService.create(CreateBarangKeluarDto),
      statusCode: HttpStatus.CREATED,
      message: 'success',
    };
  }
  @Get()
  async findAll() {
    const [data, count] = await this.barangKeluarService.findAll();

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
    @Body() UpdateBarangKeluarDto: UpdateBarangKeluarDto,
  ) {
    return {
      data: await this.barangKeluarService.update(id, UpdateBarangKeluarDto),
      statusCode: HttpStatus.OK,
      message: 'success',
    };
  }

  @Delete(':id')
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    await this.barangKeluarService.remove(id);

    return {
      statusCode: HttpStatus.OK,
      message: 'success',
    };
  }
}
