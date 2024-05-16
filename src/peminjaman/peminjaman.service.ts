import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreatePeminjamanDto } from './dto/create-peminjaman.dto';
import { UpdatePeminjamanDto } from './dto/update-peminjaman.dto';
import { EntityNotFoundError, Repository } from 'typeorm';
import { Peminjaman } from './entities/peminjaman.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Peminjam } from '#/peminjam/entities/peminjam.entity';

@Injectable()
export class PeminjamanService {
  constructor(
    @InjectRepository(Peminjaman)
    private peminjamanRepository: Repository<Peminjaman>,
    @InjectRepository(Peminjam)
    private peminjamRepository: Repository<Peminjam>,
  ) {}
  // @InjectRepository(Peminjaman)
  // private peminjamanRepository: Repository<Peminjaman>,

  async create(createPeminjamanDto: CreatePeminjamanDto): Promise<Peminjaman> {
    const {
      peminjamId,
      kode,
      tanggalPinjam,
      tanggalPengembalian,
      tanggalDikembalikan,
      status,
    } = createPeminjamanDto;

    // Cari Ruangan berdasarkan ID
    const peminjam = await this.peminjamRepository.findOneBy({
      id: peminjamId,
    });
    if (!peminjam) {
      throw new NotFoundException(
        `PeminjamanBarang with ID ${peminjamId} not found`,
      );
    }

    // Buat RuanganBarang baru
    const peminjamanBarang = this.peminjamanRepository.create({
      peminjam: peminjam,
      kode: kode,
      tanggalPinjam: tanggalPinjam,
      tanggalPengembalian: tanggalPengembalian,
      tanggalDikembalikan: tanggalDikembalikan,
      status: status,
    });

    // Simpan RuanganBarang ke database
    const savedPeminjaman = await this.peminjamanRepository.save(
      peminjamanBarang,
    );

    // Dapatkan entitas yang disimpan beserta relasinya
    const result = await this.peminjamanRepository
      .createQueryBuilder('peminjaman')
      .leftJoinAndSelect('peminjaman.peminjam', 'peminjam')
      .where('peminjaman.id = :id', { id: savedPeminjaman.id })
      .getOneOrFail();

    return result;
  }

  findAll() {
    return this.peminjamanRepository.findAndCount();
  }

  async findOne(id: string) {
    try {
      return await this.peminjamanRepository.findOneOrFail({
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

  async update(id: string, updatePeminjamanDto: UpdatePeminjamanDto) {
    try {
      await this.peminjamanRepository.findOneOrFail({
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

    await this.peminjamanRepository.update(id, updatePeminjamanDto);

    return this.peminjamanRepository.findOneOrFail({
      where: {
        id,
      },
    });
  }

  async remove(id: string) {
    try {
      await this.peminjamanRepository.findOneOrFail({
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

    await this.peminjamanRepository.softDelete(id);
  }
}
