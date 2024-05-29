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
import { BarangRusakService } from './barang-rusak.service';
import { CreateBarangRusakDto } from './dto/create-barang-rusak.dto';
import { UpdateBarangRusakDto } from './dto/update-barang-rusak.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('barangRusak')
export class BarangRusakController {
  constructor(private readonly barangRusakService: BarangRusakService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async create(@Body() createbarangRusakDto: CreateBarangRusakDto) {
    return {
      data: await this.barangRusakService.create(createbarangRusakDto),
      statusCode: HttpStatus.CREATED,
      message: 'success',
    };
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
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
  @UseGuards(AuthGuard('jwt'))
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
  @UseGuards(AuthGuard('jwt'))
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    await this.barangRusakService.remove(id);

    return {
      statusCode: HttpStatus.OK,
      message: 'success',
    };
  }
}
