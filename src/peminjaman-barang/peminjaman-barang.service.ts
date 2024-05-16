import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePeminjamanBarangDto } from './dto/create-peminjaman-barang.dto';
import { UpdatePeminjamanBarangDto } from './dto/update-peminjaman-barang.dto';
import { EntityNotFoundError, Repository } from 'typeorm';
import { PeminjamanBarang } from './entities/peminjaman-barang.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { RuanganBarang } from '#/ruangan-barang/entities/ruangan-barang.entity';
import { Peminjaman } from '#/peminjaman/entities/peminjaman.entity';

@Injectable()
export class PeminjamanBarangService {
  constructor(
    @InjectRepository(PeminjamanBarang)
    private peminjamanBarangRepository: Repository<PeminjamanBarang>,
    @InjectRepository(RuanganBarang)
    private ruanganBarangRepository: Repository<RuanganBarang>,
    @InjectRepository(Peminjaman)
    private peminjamanRepository: Repository<Peminjaman>,
  ) {}

  async create(
    createPeminjamanBarangDto: CreatePeminjamanBarangDto,
  ): Promise<PeminjamanBarang> {
    const { ruanganBarangId, peminjamanId, jumlah } = createPeminjamanBarangDto;

    // Cari Ruangan berdasarkan ID
    const ruanganBarang = await this.ruanganBarangRepository.findOneBy({
      id: ruanganBarangId,
    });
    if (!ruanganBarang) {
      throw new NotFoundException(
        `PeminjamanBarang with ID ${ruanganBarangId} not found`,
      );
    }
    const Peminjaman = await this.peminjamanRepository.findOneBy({
      id: peminjamanId,
    });
    if (!Peminjaman) {
      throw new NotFoundException(
        `Peminjaman with ID ${peminjamanId} not found`,
      );
    }

    // Buat RuanganBarang baru
    const peminjamanBarang = this.peminjamanBarangRepository.create({
      ruanganBarang: ruanganBarang,
      peminjaman: Peminjaman,
      jumlah: jumlah,
    });

    // Simpan RuanganBarang ke database
    const savedPeminjamanBarang = await this.peminjamanBarangRepository.save(
      peminjamanBarang,
    );

    // Dapatkan entitas yang disimpan beserta relasinya
    const result = await this.peminjamanBarangRepository
      .createQueryBuilder('peminjamanBarang')
      .leftJoinAndSelect('peminjamanBarang.ruanganBarang', 'ruanganBarang')
      .leftJoinAndSelect('peminjamanBarang.peminjaman', 'peminjaman')
      .where('peminjamanBarang.id = :id', { id: savedPeminjamanBarang.id })
      .getOneOrFail();

    return result;
  }

  findAll() {
    return this.peminjamanBarangRepository.findAndCount();
  }

  async findOne(id: string) {
    try {
      return await this.peminjamanBarangRepository.findOneOrFail({
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

  async update(
    id: string,
    updatePeminjamanBarangDto: UpdatePeminjamanBarangDto,
  ) {
    try {
      await this.peminjamanBarangRepository.findOneOrFail({
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

    await this.peminjamanBarangRepository.update(id, updatePeminjamanBarangDto);

    return this.peminjamanBarangRepository.findOneOrFail({
      where: {
        id,
      },
    });
  }

  async remove(id: string) {
    try {
      await this.peminjamanBarangRepository.findOneOrFail({
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

    await this.peminjamanBarangRepository.softDelete(id);
  }
}
