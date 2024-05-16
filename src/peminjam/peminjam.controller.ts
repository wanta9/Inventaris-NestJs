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
import { PeminjamService } from './peminjam.service';
import { CreatePeminjamDto } from './dto/create-peminjam.dto';
import { UpdatePeminjamDto } from './dto/update-peminjam.dto';

@Controller('peminjam')
export class PeminjamController {
  constructor(private readonly peminjamService: PeminjamService) {}
  @Post()
  async create(@Body() CreatePeminjamDto: CreatePeminjamDto) {
    return {
      data: await this.peminjamService.create(CreatePeminjamDto),
      statusCode: HttpStatus.CREATED,
      message: 'success',
    };
  }
  @Get()
  async findAll() {
    const [data, count] = await this.peminjamService.findAll();

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
    @Body() updatePeminjamDto: UpdatePeminjamDto,
  ) {
    return {
      data: await this.peminjamService.update(id, updatePeminjamDto),
      statusCode: HttpStatus.OK,
      message: 'success',
    };
  }

  @Delete(':id')
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    await this.peminjamService.remove(id);

    return {
      statusCode: HttpStatus.OK,
      message: 'success',
    };
  }
}
