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
import { BarangMasukService } from './barang-masuk.service';
import { CreateBarangMasukDto } from './dto/create-barang-masuk.dto';
import { UpdateBarangMasukDto } from './dto/update-barang-masuk.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('barangMasuk')
export class BarangMasukController {
  constructor(private readonly barangMasukService: BarangMasukService) {}

  @Post()
  async create(@Body() createbarangMasukDto: CreateBarangMasukDto) {
    return {
      data: await this.barangMasukService.create(createbarangMasukDto),
      statusCode: HttpStatus.CREATED,
      message: 'success',
    };
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  async findAll() {
    const [data, count] = await this.barangMasukService.findAll();

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
      data: await this.barangMasukService.findOne(id),
      statusCode: HttpStatus.OK,
      message: 'success',
    };
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'))
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateBarangMasukDto: UpdateBarangMasukDto,
  ) {
    return {
      data: await this.barangMasukService.update(id, updateBarangMasukDto),
      statusCode: HttpStatus.OK,
      message: 'success',
    };
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    await this.barangMasukService.remove(id);

    return {
      statusCode: HttpStatus.OK,
      message: 'success',
    };
  }
}
