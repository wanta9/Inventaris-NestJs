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
import { BarangRusakService } from './barang-rusak.service';
import { CreateBarangRusakDto } from './dto/create-barang-rusak.dto';
import { UpdateBarangRusakDto } from './dto/update-barang-rusak.dto';

@Controller('barangRusak')
export class BarangRusakController {
  constructor(private readonly barangRusakService: BarangRusakService) {}

  @Post()
  async create(@Body() createbarangRusakDto: CreateBarangRusakDto) {
    return {
      data: await this.barangRusakService.create(createbarangRusakDto),
      statusCode: HttpStatus.CREATED,
      message: 'success',
    };
  }

  @Get()
  async findAll() {
    const [data, count] = await this.barangRusakService.findAll();

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
      data: await this.barangRusakService.findOne(id),
      statusCode: HttpStatus.OK,
      message: 'success',
    };
  }

  @Put(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateBarangRusakDto: UpdateBarangRusakDto,
  ) {
    return {
      data: await this.barangRusakService.update(id, updateBarangRusakDto),
      statusCode: HttpStatus.OK,
      message: 'success',
    };
  }

  @Delete(':id')
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    await this.barangRusakService.remove(id);

    return {
      statusCode: HttpStatus.OK,
      message: 'success',
    };
  }
}
