import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateBarangMasukDto } from './dto/create-barang-masuk.dto';
import { UpdateBarangMasukDto } from './dto/update-barang-masuk.dto';
import { EntityNotFoundError, Repository } from 'typeorm';
import { BarangMasuk } from './entities/barang-masuk.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { RuanganBarang } from '#/ruangan-barang/entities/ruangan-barang.entity';

@Injectable()
export class BarangMasukService {
  constructor(
    @InjectRepository(BarangMasuk)
    private barangMasukRepository: Repository<BarangMasuk>,
    @InjectRepository(RuanganBarang)
    private ruanganBarangRepository: Repository<RuanganBarang>,
  ) {}

  async create(createbarangMasukDto: CreateBarangMasukDto) {
    const ruanganBarang = await this.ruanganBarangRepository.findOneOrFail({
      where: {
        id: createbarangMasukDto.ruanganBarangId,
      },
    });
    let tanggal: Date = new Date(createbarangMasukDto.tanggalMasuk);
    const barangMasuk = new BarangMasuk();
    barangMasuk.ruanganBarang = ruanganBarang;
    barangMasuk.kode = createbarangMasukDto.kode;
    barangMasuk.harga = createbarangMasukDto.harga;
    barangMasuk.jumlah = createbarangMasukDto.jumlah;
    barangMasuk.keterangan = createbarangMasukDto.keterangan;
    barangMasuk.tanggalMasuk = tanggal;
    const result = await this.barangMasukRepository.insert(barangMasuk);

    const results = await this.barangMasukRepository
      .createQueryBuilder('barangMasuk')
      .leftJoinAndSelect('barangMasuk.ruanganBarang', 'ruanganBarang')
      .where('barangMasuk.id = :id', { id: result.identifiers[0].id })
      .getOneOrFail();

    return results[0];
  }

  findAll() {
    return this.barangMasukRepository
      .createQueryBuilder('barangMasuk')
      .leftJoinAndSelect('barangMasuk.ruanganBarang', 'ruanganBarang')
      .leftJoinAndSelect('ruanganBarang.ruangan', 'ruangan')
      .leftJoinAndSelect('ruanganBarang.barang', 'barang')
      .getManyAndCount();
  }

  async findOne(id: string) {
    try {
      return this.barangMasukRepository
        .createQueryBuilder('barangMasuk')
        .leftJoinAndSelect('barangMasuk.ruanganBarang', 'ruanganBarang')
        .leftJoinAndSelect('ruanganBarang.ruangan', 'ruangan')
        .leftJoinAndSelect('ruanganBarang.barang', 'barang')
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

  async update(id: string, updatebarangMasukDto: UpdateBarangMasukDto) {
    try {
      await this.barangMasukRepository.findOneOrFail({
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

    await this.barangMasukRepository.update(id, updatebarangMasukDto);

    return this.barangMasukRepository.findOneOrFail({
      where: {
        id,
      },
    });
  }

  async remove(id: string) {
    try {
      await this.barangMasukRepository.findOneOrFail({
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

    await this.barangMasukRepository.delete(id);
  }
}
