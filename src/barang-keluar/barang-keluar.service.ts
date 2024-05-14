import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateBarangKeluarDto } from './dto/create-barang-keluar.dto';
import { UpdateBarangKeluarDto } from './dto/update-barang-keluar.dto';
import { EntityNotFoundError, Repository } from 'typeorm';
import { BarangKeluar } from './entities/barang-keluar.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { RuanganBarang } from '#/ruangan-barang/entities/ruangan-barang.entity';

@Injectable()
export class BarangKeluarService {
  constructor(
    @InjectRepository(BarangKeluar)
    private barangKeluarRepository: Repository<BarangKeluar>,
    @InjectRepository(RuanganBarang)
    private ruanganBarangRepository: Repository<RuanganBarang>,
  ) {}

  async create(CreateBarangKeluarDto: CreateBarangKeluarDto) {
    const ruanganBarang = await this.ruanganBarangRepository.findOneOrFail({
      where: {
        id: CreateBarangKeluarDto.ruanganBarangId,
      },
    });
    let tanggal: Date = new Date(CreateBarangKeluarDto.tanggalKeluar);

    const barangKeluar = new BarangKeluar();
    barangKeluar.ruanganBarang = ruanganBarang;
    barangKeluar.kode = CreateBarangKeluarDto.kode;
    barangKeluar.jumlah = CreateBarangKeluarDto.jumlah;
    barangKeluar.keterangan = CreateBarangKeluarDto.keterangan;
    barangKeluar.tanggalKeluar = tanggal;

    const result = await this.barangKeluarRepository.insert(barangKeluar);

    const results = await this.ruanganBarangRepository
      .createQueryBuilder('barangKeluar')
      .leftJoinAndSelect('barangKeluar.ruanganBarang', 'ruanganBarang')
      .where('barangKeluar.id = :id', { id: result.identifiers[0].id })
      .getOneOrFail();

    return results[0];
  }

  findAll() {
    return this.barangKeluarRepository.findAndCount();
  }

  async findOne(id: string) {
    try {
      return await this.barangKeluarRepository.findOneOrFail({
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

  async update(id: string, updateBarangKeluarDto: UpdateBarangKeluarDto) {
    try {
      await this.barangKeluarRepository.findOneOrFail({
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

    await this.barangKeluarRepository.update(id, updateBarangKeluarDto);

    return this.barangKeluarRepository.findOneOrFail({
      where: {
        id,
      },
    });
  }

  async remove(id: string) {
    try {
      await this.barangKeluarRepository.findOneOrFail({
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

    await this.barangKeluarRepository.softDelete(id);
  }
}
