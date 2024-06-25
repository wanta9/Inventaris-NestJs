import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateRuanganBarangDto } from './dto/create-ruangan-barang.dto';
import { UpdateRuanganBarangDto } from './dto/update-ruangan-barang.dto';
import { EntityNotFoundError, Repository } from 'typeorm';
import { RuanganBarang } from './entities/ruangan-barang.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Ruangan } from '#/ruangan/entities/ruangan.entity';
import { Barang } from '#/barang/entities/barang.entity';

@Injectable()
export class ruanganBarangService {
  constructor(
    @InjectRepository(RuanganBarang)
    private ruanganBarangRepository: Repository<RuanganBarang>,
    @InjectRepository(Ruangan)
    private ruanganRepository: Repository<Ruangan>,
    @InjectRepository(Barang)
    private barangRepository: Repository<Barang>,
  ) {}

  async create(
    createRuanganBarangDto: CreateRuanganBarangDto,
  ): Promise<RuanganBarang> {
    const { ruanganId, barangId, jumlah } = createRuanganBarangDto;

    // Cari Ruangan berdasarkan ID
    const ruangan = await this.ruanganRepository.findOneBy({ id: ruanganId });
    if (!ruangan) {
      throw new NotFoundException(`Ruangan with ID ${ruanganId} not found`);
    }

    // Cari Barang berdasarkan ID
    const barang = await this.barangRepository.findOneBy({ id: barangId });
    if (!barang) {
      throw new NotFoundException(`Barang with ID ${barangId} not found`);
    }

    // Buat RuanganBarang baru
    const ruanganBarang = this.ruanganBarangRepository.create({
      ruangan: ruangan,
      barang: barang,
      jumlah: jumlah,
    });

    // Simpan RuanganBarang ke database
    const savedRuanganBarang = await this.ruanganBarangRepository.save(
      ruanganBarang,
    );

    // Dapatkan entitas yang disimpan beserta relasinya
    const result = await this.ruanganBarangRepository
      .createQueryBuilder('ruanganBarang')
      .leftJoinAndSelect('ruanganBarang.ruangan', 'ruangan')
      .leftJoinAndSelect('ruanganBarang.barang', 'barang')
      .where('ruanganBarang.id = :id', { id: savedRuanganBarang.id })
      .getOneOrFail();

    return result;
  }

  findAll() {
    return this.ruanganBarangRepository
      .createQueryBuilder('ruanganBarang')
      .leftJoinAndSelect('ruanganBarang.ruangan', 'ruangan')
      .leftJoinAndSelect('ruanganBarang.barang', 'barang')
      .getManyAndCount();
  }

  async findOne(id: string) {
    try {
      return await this.ruanganBarangRepository
        .createQueryBuilder('ruanganBarang')
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

  async update(id: string, UpdateRuanganBarangDto: UpdateRuanganBarangDto) {
    try {
      await this.ruanganBarangRepository.findOneOrFail({
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

    await this.ruanganBarangRepository.update(id, UpdateRuanganBarangDto);

    return this.ruanganBarangRepository.findOneOrFail({
      where: {
        id,
      },
    });
  }

  async remove(id: string) {
    try {
      await this.ruanganBarangRepository.findOneOrFail({
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

    await this.ruanganBarangRepository.softDelete(id);
  }
}
