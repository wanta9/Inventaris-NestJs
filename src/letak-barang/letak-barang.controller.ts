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
import { LetakBarangService } from './letak-barang.service';
import { CreateLetakBarangDto } from './dto/create-letak-barang.dto';
import { UpdateLetakBarangDto } from './dto/update-letakbarang.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('letak-barang')
export class LetakBarangController {
  constructor(private readonly letakbarangService: LetakBarangService) {}

  @Post()
  async create(@Body() createLetakBarangDto: CreateLetakBarangDto) {
    return {
      data: await this.letakbarangService.create(createLetakBarangDto),
      statusCode: HttpStatus.CREATED,
      message: 'success',
    };
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  async findAll() {
    const [data, count] = await this.letakbarangService.findAll();

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
      data: await this.letakbarangService.findOne(id),
      statusCode: HttpStatus.OK,
      message: 'success',
    };
  }

  @Put(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateLetakBarangDto: UpdateLetakBarangDto,
  ) {
    return {
      data: await this.letakbarangService.update(id, updateLetakBarangDto),
      statusCode: HttpStatus.OK,
      message: 'success',
    };
  }

  @Delete(':id')
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    await this.letakbarangService.remove(id);

    return {
      statusCode: HttpStatus.OK,
      message: 'success',
    };
  }
}
