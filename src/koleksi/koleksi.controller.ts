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
import { KoleksiService } from './koleksi.service';
import { CreateKoleksiDto } from './dto/create-koleksi.dto';
import { UpdateKoleksiDto } from './dto/update-koleksi.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('koleksi')
export class KoleksiController {
  constructor(private readonly koleksiService: KoleksiService) {}
  @Post()
  @UseGuards(AuthGuard('jwt'))
  async create(@Body() CreatekoleksiDto: CreateKoleksiDto) {
    return {
      data: await this.koleksiService.create(CreatekoleksiDto),
      statusCode: HttpStatus.CREATED,
      message: 'success',
    };
  }
  @Get()
  @UseGuards(AuthGuard('jwt'))
  async findAll() {
    const [data, count] = await this.koleksiService.findAll();

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
    @Body() UpdateKoleksiDto: UpdateKoleksiDto,
  ) {
    return {
      data: await this.koleksiService.update(id, UpdateKoleksiDto),
      statusCode: HttpStatus.OK,
      message: 'success',
    };
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    await this.koleksiService.remove(id);

    return {
      statusCode: HttpStatus.OK,
      message: 'success',
    };
  }
}
