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
import { ruanganService } from './ruangan.service';
import { CreateRuanganDto } from './dto/create-ruangan.dto';
import { UpdateRuanganDto } from './dto/update-ruangan.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('ruangan')
export class RuanganController {
  constructor(private readonly ruanganService: ruanganService) {}
  @Post()
  async create(@Body() CreateRuanganDto: CreateRuanganDto) {
    return {
      data: await this.ruanganService.create(CreateRuanganDto),
      statusCode: HttpStatus.CREATED,
      message: 'success',
    };
  }
  @Get()
  @UseGuards(AuthGuard('jwt'))
  async findAll() {
    const [data, count] = await this.ruanganService.findAll();

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
    @Body() updateRuanganDto: UpdateRuanganDto,
  ) {
    return {
      data: await this.ruanganService.update(id, updateRuanganDto),
      statusCode: HttpStatus.OK,
      message: 'success',
    };
  }

  @Delete(':id')
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    await this.ruanganService.remove(id);

    return {
      statusCode: HttpStatus.OK,
      message: 'success',
    };
  }
}
