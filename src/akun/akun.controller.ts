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
import { CreateAkunDto } from './dto/create-akun.dto';
import { UpdateAkunDto } from './dto/update-akun.dto';
import { AkunService } from './akun.service';
import { LoginDto } from './dto/login.dto';
import { AuthGuard } from '@nestjs/passport';
@Controller('akun')
export class AkunController {
  constructor(private readonly akunService: AkunService) {}

  @Post()
  async create(@Body() createAkunDto: CreateAkunDto) {
    createAkunDto.status = createAkunDto.status.toLowerCase();
    return {
      data: await this.akunService.create(createAkunDto),
      statusCode: HttpStatus.CREATED,
      message: 'success',
    };
  }

  @Post('/login')
  async login(@Body() login: LoginDto) {
    const data = await this.akunService.login(login);
    return {
      data: data,
      statusCode: HttpStatus.OK,
      message: 'success',
    };
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  async findAll() {
    const [data, count] = await this.akunService.findAll();

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
    @Body() updateAkunDto: UpdateAkunDto,
  ) {
    return {
      data: await this.akunService.update(id, updateAkunDto),
      statusCode: HttpStatus.OK,
      message: 'success',
    };
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    await this.akunService.remove(id);

    return {
      statusCode: HttpStatus.OK,
      message: 'success',
    };
  }
}
