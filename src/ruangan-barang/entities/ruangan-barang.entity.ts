import { BarangKeluar } from '#/barang-keluar/entities/barang-keluar.entity';
import { BarangMasuk } from '#/barang-masuk/entities/barang-masuk.entity';
import { BarangRusak } from '#/barang-rusak/entities/barang-rusak.entity';
import { Barang } from '#/barang/entities/barang.entity';
import { Koleksi } from '#/koleksi/entities/koleksi.entity';
import { PeminjamanBarang } from '#/peminjaman-barang/entities/peminjaman-barang.entity';
import { Ruangan } from '#/ruangan/entities/ruangan.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class RuanganBarang {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  jumlah: number;

  @OneToMany(() => BarangMasuk, (barangMasuk) => barangMasuk.ruanganBarang)
  barangMasuk: BarangMasuk[];

  @OneToMany(() => BarangKeluar, (barangkeluar) => barangkeluar.ruanganBarang)
  barangkeluar: BarangKeluar[];

  @OneToMany(() => BarangRusak, (barangRusak) => barangRusak.ruanganBarang)
  barangRusak: BarangRusak[];

  @OneToMany(
    () => PeminjamanBarang,
    (peminjamanBarang) => peminjamanBarang.ruanganBarang,
  )
  peminjamanBarang: PeminjamanBarang[];

  @OneToMany(() => Koleksi, (koleksi) => koleksi.ruanganBarang)
  koleksi: Koleksi[];

  @ManyToOne(() => Ruangan, (ruangan) => ruangan.ruanganBarang)
  ruangan: Ruangan;

  @ManyToOne(() => Barang, (barang) => barang.ruanganBarang)
  barang: Barang;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
