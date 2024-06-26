import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAkunDto } from './dto/create-akun.dto';
import { UpdateAkunDto } from './dto/update-akun.dto';
import { EntityNotFoundError, Repository } from 'typeorm';
import { Akun } from './entities/akun.entity';
import { statusBarang } from './entities/akun.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Peran } from '#/peran/entities/peran.entity';
import * as bcrypt from 'bcryptjs';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { error } from 'console';

@Injectable()
export class AkunService {
  constructor(
    @InjectRepository(Akun)
    private akunRepository: Repository<Akun>,
    @InjectRepository(Peran)
    private peranRepository: Repository<Peran>,
    private jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto) {
    try {
      const existUser = await this.akunRepository
        .createQueryBuilder('akun')
        .innerJoinAndSelect('akun.peran', 'peran')
        .where('akun.username = :username', { username: loginDto.username })
        .getOneOrFail();
      const isRightPassword = await bcrypt.compare(
        loginDto.password,
        existUser.password,
      );

      if (existUser && isRightPassword) {
        const accessToken = this.jwtService.sign(
          {
            existUser: {
              id: existUser.id,
              nama: existUser.nama,
              username: existUser.username,
              role: existUser.peran.Role,
            },
          },
          {
            secret: '123',
            expiresIn: '1d',
          },
        );
        return accessToken;
      }

      throw new HttpException(
        {
          statusCode: HttpStatus.BAD_REQUEST,
          error: 'Username or Password is incorrect',
        },
        HttpStatus.NOT_FOUND,
      );
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

  async create(createAkunDto: CreateAkunDto) {
    const peran = await this.peranRepository.findOneOrFail({
      where: {
        id: createAkunDto.peranId,
      },
    });
    createAkunDto.status = createAkunDto.status.toLowerCase();
    const akun = new Akun();
    const salt = await bcrypt.genSalt();
    const password = await bcrypt.hash(createAkunDto.password, salt);
    akun.peran = peran;
    akun.salt = salt;
    akun.username = createAkunDto.username;
    akun.password = password;
    akun.nama = createAkunDto.nama;
    akun.gambar = createAkunDto.gambar;
    akun.email = createAkunDto.email;
    akun.telp = createAkunDto.telp;
    akun.isOnline = createAkunDto.isOnline;

    let status;

    if (createAkunDto.status == 'aktif') {
      status = statusBarang.Aktif;
    } else if (createAkunDto.status == 'tidak aktif') {
      status = statusBarang.TidakAktif;
    } else if (createAkunDto.status == 'pending') {
      status = statusBarang.Pending;
    } else if (createAkunDto.status == 'ditrima') {
      status = statusBarang.Diterima;
    } else if (createAkunDto.status == 'ditolak') {
      status = statusBarang.Ditolak;
    }

    akun.status = status;
    const result = await this.akunRepository.insert(akun);

    const results = await this.akunRepository
      .createQueryBuilder('akun')
      .leftJoinAndSelect('akun.peran', 'peran')
      .where('akun.id = :id', { id: result.identifiers[0].id })
      .getOneOrFail();

    return results[0];
  }

  findAll() {
    return this.akunRepository.findAndCount();
  }

  async findOne(id: string) {
    try {
      return this.akunRepository
        .createQueryBuilder('akun')
        .leftJoinAndSelect('akun.peran', 'peran')
        .where('akun.id = :id', { id: id })
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

  async update(id: string, updateAkunDto: UpdateAkunDto) {
    try {
      await this.akunRepository.findOneOrFail({
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
      ...updateAkunDto,
      status:
        updateAkunDto.status === 'aktif'
          ? statusBarang.Aktif
          : updateAkunDto.status === 'pending'
          ? statusBarang.Pending
          : updateAkunDto.status === 'diterima'
          ? statusBarang.Diterima
          : updateAkunDto.status === 'ditolak'
          ? statusBarang.Ditolak
          : statusBarang.TidakAktif,
      isOnline: updateAkunDto.isOnline,
    };

    await this.akunRepository.update(id, partialUpdate);

    return this.akunRepository.findOneOrFail({ where: { id } });
  }

  async remove(id: string) {
    try {
      await this.akunRepository.findOneOrFail({
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

    await this.akunRepository.softDelete(id);
  }
}
