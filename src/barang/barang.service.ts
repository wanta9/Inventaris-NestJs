import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateBarangDto } from './dto/create-barang.dto';
import { UpdateBarangDto } from './dto/update-barang.dto';
import { EntityNotFoundError, Repository } from 'typeorm';
import { Barang } from './entities/barang.entity';
import { KondisiBarang } from './entities/barang.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class BarangService {
  constructor(
    @InjectRepository(Barang)
    private barangRepository: Repository<Barang>,
  ) {}

  async create(createBarangDto: CreateBarangDto) {
    const barang = new Barang();
    barang.name = createBarangDto.nama;
    barang.gambar = createBarangDto.gambar;
    barang.deskripsi = createBarangDto.deskripsi;
    barang.jumlah = createBarangDto.jumlah;
    barang.harga = createBarangDto.harga;

    let kondisi = barang.kondisi;
    if (kondisi == 'baik') {
      kondisi = KondisiBarang.Baik;
    } else {
      kondisi = KondisiBarang.Rusak;
    }

    barang.kondisi = kondisi;
    const result = await this.barangRepository.insert(barang);

    return this.barangRepository.findOneOrFail({
      where: {
        id: result.identifiers[0].id,
      },
    });
  }

  findAll() {
    return this.barangRepository.findAndCount();
  }

  async findOne(id: string) {
    try {
      return await this.barangRepository.findOneOrFail({
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

  async update(id: string, updateBarangDto: UpdateBarangDto) {
    try {
      await this.barangRepository.findOneOrFail({
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

    await this.barangRepository.update(id, UpdateBarangDto);

    return this.barangRepository.findOneOrFail({
      where: {
        id,
      },
    });
  }

  async remove(id: string) {
    try {
      await this.barangRepository.findOneOrFail({
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

    await this.barangRepository.softDelete(id);
  }
}
