import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateLetakBarangDto } from './dto/create-letak-barang.dto';
import { UpdateLetakBarangDto } from './dto/update-letakbarang.dto';
import { EntityNotFoundError, Repository } from 'typeorm';
import { LetakBarang } from './entities/letak-barang.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class LetakBarangService {
  constructor(
    @InjectRepository(LetakBarang)
    private letakbarangRepository: Repository<LetakBarang>,
  ) {}

  async create(CreateLetakBarangDto: CreateLetakBarangDto) {
    const result = await this.letakbarangRepository.insert(
      CreateLetakBarangDto,
    );

    return this.letakbarangRepository.findOneOrFail({
      where: {
        id: result.identifiers[0].id,
      },
    });
  }

  findAll() {
    return this.letakbarangRepository.findAndCount();
  }

  async findOne(id: string) {
    try {
      return await this.letakbarangRepository.findOneOrFail({
        where: {
          id,
        },
      });
    } catch (e) {
      if (e instanceof EntityNotFoundError) {
        throw new HttpException(
          {
            statusCode: HttpStatus.NOT_FOUND,
            error: 'Data not found',
          },
          HttpStatus.NOT_FOUND,
        );
      } else {
        throw e;
      }
    }
  }

  async update(id: string, updateLetakBarangDto: UpdateLetakBarangDto) {
    try {
      await this.letakbarangRepository.findOneOrFail({
        where: {
          id,
        },
      });
    } catch (e) {
      if (e instanceof EntityNotFoundError) {
        throw new HttpException(
          {
            statusCode: HttpStatus.NOT_FOUND,
            error: 'Data not found',
          },
          HttpStatus.NOT_FOUND,
        );
      } else {
        throw e;
      }
    }

    await this.letakbarangRepository.update(id, updateLetakBarangDto);

    return this.letakbarangRepository.findOneOrFail({
      where: {
        id,
      },
    });
  }

  async remove(id: string) {
    try {
      await this.letakbarangRepository.findOneOrFail({
        where: {
          id,
        },
      });
    } catch (e) {
      if (e instanceof EntityNotFoundError) {
        throw new HttpException(
          {
            statusCode: HttpStatus.NOT_FOUND,
            error: 'Data not found',
          },
          HttpStatus.NOT_FOUND,
        );
      } else {
        throw e;
      }
    }

    await this.letakbarangRepository.delete(id);
  }
}
