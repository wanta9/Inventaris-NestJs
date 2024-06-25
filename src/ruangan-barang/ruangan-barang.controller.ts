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
import { ruanganBarangService } from './ruangan-barang.service';
import { CreateRuanganBarangDto } from './dto/create-ruangan-barang.dto';
import { UpdateRuanganBarangDto } from './dto/update-ruangan-barang.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('ruanganBarang')
export class RuanganBarangController {
  constructor(private readonly ruanganBarangService: ruanganBarangService) {}
  @Post()
  @UseGuards(AuthGuard('jwt'))
  async create(@Body() CreateRuanganBarangDto: CreateRuanganBarangDto) {
    return {
      data: await this.ruanganBarangService.create(CreateRuanganBarangDto),
      statusCode: HttpStatus.CREATED,
      message: 'success',
    };
  }
  @Get()
  @UseGuards(AuthGuard('jwt'))
  async findAll() {
    const [data, count] = await this.ruanganBarangService.findAll();

    console.log('Result:', data);
    console.log('Total:', count);
    return {
      data,
      count,
      statusCode: HttpStatus.OK,
      message: 'success',
    };
  }

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    return {
      data: await this.ruanganBarangService.findOne(id),
      statusCode: HttpStatus.OK,
      message: 'success',
    };
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'))
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
  @UseGuards(AuthGuard('jwt'))
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    await this.ruanganBarangService.remove(id);

    return {
      statusCode: HttpStatus.OK,
      message: 'success',
    };
  }
}
