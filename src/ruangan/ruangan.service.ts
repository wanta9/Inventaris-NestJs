import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateRuanganDto } from './dto/create-ruangan.dto';
import { UpdateRuanganDto } from './dto/update-ruangan.dto';
import { EntityNotFoundError, Repository } from 'typeorm';
import { Ruangan } from './entities/ruangan.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ruanganService {
  constructor(
    @InjectRepository(Ruangan)
    private ruanganRepository: Repository<Ruangan>,
  ) {}

  async create(createRuanganDTO: CreateRuanganDto) {
    const result = await this.ruanganRepository.insert(createRuanganDTO);

    return this.ruanganRepository.findOneOrFail({
      where: {
        id: result.identifiers[0].id,
      },
    });
  }

  findAll() {
    return this.ruanganRepository.findAndCount();
  }

  async findOne(id: string) {
    try {
      return await this.ruanganRepository.findOneOrFail({
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

  async update(id: string, updateRuanganDTO: UpdateRuanganDto) {
    try {
      await this.ruanganRepository.findOneOrFail({
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

    await this.ruanganRepository.update(id, updateRuanganDTO);

    return this.ruanganRepository.findOneOrFail({
      where: {
        id,
      },
    });
  }

  async remove(id: string) {
    try {
      await this.ruanganRepository.findOneOrFail({
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

    await this.ruanganRepository.softDelete(id);
  }
}
