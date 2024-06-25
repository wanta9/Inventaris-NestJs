import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePeminjamDto } from './dto/create-peminjam.dto';
import { UpdatePeminjamDto } from './dto/update-peminjam.dto';
import { EntityNotFoundError, Repository } from 'typeorm';
import { Peminjam } from './entities/peminjam.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Akun } from '#/akun/entities/akun.entity';

@Injectable()
export class PeminjamService {
  constructor(
    @InjectRepository(Peminjam)
    private peminjamRepository: Repository<Peminjam>,
    @InjectRepository(Akun)
    private akunRepository: Repository<Akun>,
  ) {}

  async create(createPeminjamDto: CreatePeminjamDto) {
    const akun = await this.akunRepository.findOneOrFail({
      where: {
        id: createPeminjamDto.akunId,
      },
    });
    const peminjam = new Peminjam();
    peminjam.akun = akun;
    peminjam.NISN = createPeminjamDto.NISN;
    peminjam.kelas = createPeminjamDto.kelas;

    const result = await this.peminjamRepository.insert(peminjam);

    const results = await this.peminjamRepository
      .createQueryBuilder('peminjam')
      .leftJoinAndSelect('peminjam.akun', 'akun')
      .where('peminjam.id = :id', { id: result.identifiers[0].id })
      .getOneOrFail();

    return results[0];
  }

  findAll() {
    return this.peminjamRepository
      .createQueryBuilder('peminjam')
      .leftJoinAndSelect('peminjam.akun', 'akun')
      .leftJoinAndSelect('akun.peran', 'peran')
      .getManyAndCount();
  }

  async findOne(id: string) {
    try {
      return this.peminjamRepository
        .createQueryBuilder('peminjam')
        .leftJoinAndSelect('peminjam.akun', 'akun')
        .leftJoinAndSelect('akun.peran', 'peran')
        .getOne();
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

    await this.peminjamRepository.softDelete(id);
  }
}
