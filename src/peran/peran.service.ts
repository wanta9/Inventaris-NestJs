import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePeranDto } from './dto/create-peran.dto';
import { UpdatePeranDto } from './dto/update-peran.dto';
import { EntityNotFoundError, Repository } from 'typeorm';
import { Peran, rolePeran } from './entities/peran.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class peranService {
  constructor(
    @InjectRepository(Peran)
    private peranRepository: Repository<Peran>,
  ) {}

  async create(createPeranDto: CreatePeranDto) {
    createPeranDto.Peran = createPeranDto.Peran.toLowerCase();
    const iniPeran = new Peran();

    let peran;

    if (createPeranDto.Peran == 'admin') {
      peran = rolePeran.Admin;
    } else if (createPeranDto.Peran == 'petugas') {
      peran = rolePeran.Petugas;
    } else if (createPeranDto.Peran == 'peminjam') {
      peran = rolePeran.Peminjam;
    }

    iniPeran.Role = peran;

    const result = await this.peranRepository.insert(iniPeran);

    return this.peranRepository.findOneOrFail({
      where: {
        id: result.identifiers[0].id,
      },
    });
  }

  findAll() {
    return this.peranRepository.findAndCount();
  }

  async findOne(id: string) {
    try {
      return await this.peranRepository.findOneOrFail({
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

  async update(id: string, updatePeranDto: UpdatePeranDto) {
    try {
      await this.peranRepository.findOneOrFail({
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

    const partialUpdate = {
      ...updatePeranDto,
      Role:
        updatePeranDto.Peran === 'baik'
          ? rolePeran.Admin
          : rolePeran.Petugas || rolePeran.Peminjam,
    };
    await this.peranRepository.update(id, partialUpdate);

    return this.peranRepository.findOneOrFail({
      where: {
        id,
      },
    });
  }

  async remove(id: string) {
    try {
      await this.peranRepository.findOneOrFail({
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

    await this.peranRepository.softDelete(id);
  }
}
