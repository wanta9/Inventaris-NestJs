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
import { CreateBarangDto } from './dto/create-barang.dto';
import { UpdateBarangDto } from './dto/update-barang.dto';
import { BarangService } from './barang.service';
@Controller('barang')
export class BarangController {
  constructor(private readonly barangService: BarangService) {}
  @Post()
  async create(@Body() createBarangDto: CreateBarangDto) {
    createBarangDto.kondisi = createBarangDto.kondisi.toLowerCase();
    return {
      data: await this.barangService.create(createBarangDto),
      statusCode: HttpStatus.CREATED,
      message: 'success',
    };
  }
  @Get()
  async findAll() {
    const [data, count] = await this.barangService.findAll();

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
    @Body() updateBarangDto: UpdateBarangDto,
  ) {
    return {
      data: await this.barangService.update(id, updateBarangDto),
      statusCode: HttpStatus.OK,
      message: 'success',
    };
  }

  @Delete(':id')
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    await this.barangService.remove(id);

    return {
      statusCode: HttpStatus.OK,
      message: 'success',
    };
  }
}
