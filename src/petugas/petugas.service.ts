import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePetugasDto } from './dto/create-petugas.dto';
import { UpdatePetugasDto } from './dto/update-petugas.dto';
import { EntityNotFoundError, Repository } from 'typeorm';
import { Petugas } from './entities/petugas.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Akun } from '#/akun/entities/akun.entity';

@Injectable()
export class PetugasService {
  constructor(
    @InjectRepository(Petugas)
    private petugasRepository: Repository<Petugas>,
    @InjectRepository(Akun)
    private akunRepository: Repository<Akun>,
  ) {}

  async create(createPetugasDto: CreatePetugasDto) {
    const akun = await this.akunRepository.findOneOrFail({
      where: {
        id: createPetugasDto.akunId,
      },
    });
    const petugas = new Petugas();
    petugas.akun = akun;
    petugas.NIP = createPetugasDto.NIP;

    const result = await this.petugasRepository.insert(petugas);

    const results = await this.petugasRepository
      .createQueryBuilder('petugas')
      .leftJoinAndSelect('petugas.akun', 'akun')
      .where('petugas.id = :id', { id: result.identifiers[0].id })
      .getOneOrFail();

    return results[0];
  }

  findAll() {
    return this.petugasRepository.findAndCount();
  }

  async findOne(id: string) {
    try {
      return await this.petugasRepository.findOneOrFail({
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

  async update(id: string, updatePetugasDto: UpdatePetugasDto) {
    try {
      await this.petugasRepository.findOneOrFail({
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

    await this.petugasRepository.update(id, updatePetugasDto);

    return this.petugasRepository.findOneOrFail({
      where: {
        id,
      },
    });
  }

  async remove(id: string) {
    try {
      await this.petugasRepository.findOneOrFail({
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

    await this.petugasRepository.softDelete(id);
  }
}
