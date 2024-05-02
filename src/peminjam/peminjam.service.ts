import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePeminjamDto } from './dto/create-peminjam.dto';
import { UpdatePeminjamDto } from './dto/update-peminjam.dto';
import { EntityNotFoundError, Repository } from 'typeorm';
import { Peminjam } from './entities/peminjam.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PeminjamService {
  constructor(
    @InjectRepository(Peminjam)
    private peminjamRepository: Repository<Peminjam>,
  ) {}

  async create(createPeminjamDto: CreatePeminjamDto) {
    const result = await this.peminjamRepository.insert(createPeminjamDto);

    return this.peminjamRepository.findOneOrFail({
      where: {
        id: result.identifiers[0].id,
      },
    });
  }

  findAll() {
    return this.peminjamRepository.findAndCount();
  }

  async findOne(id: string) {
    try {
      return await this.peminjamRepository.findOneOrFail({
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

  async update(id: string, updatePeminjamDto: UpdatePeminjamDto) {
    try {
      await this.peminjamRepository.findOneOrFail({
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

    await this.peminjamRepository.update(id, updatePeminjamDto);

    return this.peminjamRepository.findOneOrFail({
      where: {
        id,
      },
    });
  }

  async remove(id: string) {
    try {
      await this.peminjamRepository.findOneOrFail({
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

    await this.peminjamRepository.delete(id);
  }
}
