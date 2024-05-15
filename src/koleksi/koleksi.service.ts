import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateKoleksiDto } from './dto/create-koleksi.dto';
import { UpdateKoleksiDto } from './dto/update-koleksi.dto';
import { EntityNotFoundError, Repository } from 'typeorm';
import { Koleksi } from './entities/koleksi.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { RuanganBarang } from '#/ruangan-barang/entities/ruangan-barang.entity';
import { PeminjamanBarang } from '#/peminjaman-barang/entities/peminjaman-barang.entity';

@Injectable()
export class KoleksiService {
  constructor(
    @InjectRepository(Koleksi)
    private koleksiRepository: Repository<Koleksi>,
    @InjectRepository(RuanganBarang)
    private ruanganBarangRepository: Repository<RuanganBarang>,
    @InjectRepository(PeminjamanBarang)
    private peminjamanBarangRepository: Repository<PeminjamanBarang>,
  ) {}

  async create(createKoleksiDto: CreateKoleksiDto): Promise<Koleksi> {
    const { ruanganBarangId, peminjamanBarangId, jumlah } = createKoleksiDto;

    // Cari Ruangan berdasarkan ID
    const ruanganBarang = await this.ruanganBarangRepository.findOneBy({
      id: ruanganBarangId,
    });
    if (!ruanganBarang) {
      throw new NotFoundException(
        `Koleksi with ID ${ruanganBarangId} not found`,
      );
    }
    const peminjamanBarang = await this.peminjamanBarangRepository.findOneBy({
      id: peminjamanBarangId,
    });
    if (!RuanganBarang) {
      throw new NotFoundException(
        `RuanganBarang with ID ${peminjamanBarangId} not found`,
      );
    }

    // Buat RuanganBarang baru
    const koleksi = this.koleksiRepository.create({
      ruanganBarang: ruanganBarang,
      peminjamanBarang: peminjamanBarang,
      jumlah: jumlah,
    });

    // Simpan RuanganBarang ke database
    const savedKoleksi = await this.koleksiRepository.save(koleksi);

    // Dapatkan entitas yang disimpan beserta relasinya
    const result = await this.koleksiRepository
      .createQueryBuilder('koleksi')
      .leftJoinAndSelect('koleksi.ruanganBarang', 'ruanganBarang')
      .leftJoinAndSelect('koleksi.peminjamanBarang', 'peminjamanBarang')
      .where('koleksi.id = :id', { id: savedKoleksi.id })
      .getOneOrFail();

    return result;
  }

  findAll() {
    return this.koleksiRepository.findAndCount();
  }

  async findOne(id: string) {
    try {
      return await this.koleksiRepository.findOneOrFail({
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

  async update(id: string, updateKoleksiDto: UpdateKoleksiDto) {
    try {
      await this.koleksiRepository.findOneOrFail({
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

    await this.koleksiRepository.update(id, updateKoleksiDto);

    return this.koleksiRepository.findOneOrFail({
      where: {
        id,
      },
    });
  }

  async remove(id: string) {
    try {
      await this.koleksiRepository.findOneOrFail({
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

    await this.koleksiRepository.softDelete(id);
  }
}
