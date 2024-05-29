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
import { peranService } from './peran.service';
import { CreatePeranDto } from './dto/create-peran.dto';
import { UpdatePeranDto } from './dto/update-peran.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('peran')
export class PeranController {
  constructor(private readonly peranService: peranService) {}
  @Post()
  async create(@Body() CreatePeranDto: CreatePeranDto) {
    CreatePeranDto.Peran = CreatePeranDto.Peran.toLowerCase();
    return {
      data: await this.peranService.create(CreatePeranDto),
      statusCode: HttpStatus.CREATED,
      message: 'success',
    };
  }
  @Get()
  @UseGuards(AuthGuard('jwt'))
  async findAll() {
    const [data, count] = await this.peranService.findAll();

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
    @Body() updatePeranDto: UpdatePeranDto,
  ) {
    return {
      data: await this.peranService.update(id, updatePeranDto),
      statusCode: HttpStatus.OK,
      message: 'success',
    };
  }

  @Delete(':id')
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    await this.peranService.remove(id);

    return {
      statusCode: HttpStatus.OK,
      message: 'success',
    };
  }
}
