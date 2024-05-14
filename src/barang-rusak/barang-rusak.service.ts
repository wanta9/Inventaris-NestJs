import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateBarangRusakDto } from './dto/create-barang-rusak.dto';
import { UpdateBarangRusakDto } from './dto/update-barang-rusak.dto';
import { EntityNotFoundError, Repository } from 'typeorm';
import { BarangRusak, statusRusak } from './entities/barang-rusak.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { RuanganBarang } from '#/ruangan-barang/entities/ruangan-barang.entity';
import { statusBarang } from '#/akun/entities/akun.entity';

@Injectable()
export class BarangRusakService {
  constructor(
    @InjectRepository(BarangRusak)
    private barangRusakRepository: Repository<BarangRusak>,
    @InjectRepository(RuanganBarang)
    private ruanganBarangRepository: Repository<RuanganBarang>,
  ) {}

  async create(createbarangRusakDto: CreateBarangRusakDto) {
    const ruanganBarang = await this.ruanganBarangRepository.findOneOrFail({
      where: {
        id: createbarangRusakDto.ruanganBarangId,
      },
    });
    let tanggalRusak: Date = new Date(createbarangRusakDto.tanggalRusak),
      tanggalPerbaikan: Date = new Date(createbarangRusakDto.tanggalPerbaikan);

    const barangRusak = new BarangRusak();
    barangRusak.ruanganBarang = ruanganBarang;
    barangRusak.kode = createbarangRusakDto.kode;
    barangRusak.jumlah = createbarangRusakDto.jumlah;
    barangRusak.keterangan = createbarangRusakDto.keterangan;
    barangRusak.tanggalRusak = tanggalRusak;
    barangRusak.tanggalPerbaikan = tanggalPerbaikan;

    let status;

    if (createbarangRusakDto.status == 'diperbaiki') {
      status = statusRusak.Diperbaiki;
    } else if (createbarangRusakDto.status == 'rusak') {
      status = statusRusak.Rusak;
    }

    barangRusak.Status = status;
    const result = await this.barangRusakRepository.insert(barangRusak);

    const results = await this.barangRusakRepository
      .createQueryBuilder('barangRusak')
      .leftJoinAndSelect('barangRusak.ruanganBarang', 'ruanganBarang')
      .where('barangRusak.id = :id', { id: result.identifiers[0].id })
      .getOneOrFail();

    return results[0];
  }

  findAll() {
    return this.barangRusakRepository.findAndCount();
  }

  async findOne(id: string) {
    try {
      return await this.barangRusakRepository.findOneOrFail({
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

  async update(id: string, updatebarangRusakDto: UpdateBarangRusakDto) {
    try {
      await this.barangRusakRepository.findOneOrFail({
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
      ...updatebarangRusakDto,
      status:
        updatebarangRusakDto.status == 'diperbaiki'
          ? statusRusak.Diperbaiki
          : statusRusak.Rusak,
    };

    await this.barangRusakRepository.update(id, partialUpdate);

    return this.barangRusakRepository.findOneOrFail({
      where: {
        id,
      },
    });
  }

  async remove(id: string) {
    try {
      await this.barangRusakRepository.findOneOrFail({
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

    await this.barangRusakRepository.delete(id);
  }
}
