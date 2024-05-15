import { PeminjamanBarang } from '#/peminjaman-barang/entities/peminjaman-barang.entity';
import { Peminjaman } from '#/peminjaman/entities/peminjaman.entity';
import { RuanganBarang } from '#/ruangan-barang/entities/ruangan-barang.entity';
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
export class Koleksi {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  jumlah: number;

  // @OneToMany(() => BarangKeluar, (barangkeluar) => barangkeluar.ruanganBarang)
  // barangkeluar: BarangKeluar[];

  // @OneToMany(() => BarangRusak, (barangRusak) => barangRusak.ruanganBarang)
  // barangRusak: BarangRusak[];

  @ManyToOne(() => RuanganBarang, (ruanganBarang) => ruanganBarang.koleksi)
  ruanganBarang: RuanganBarang;

  @ManyToOne(
    () => PeminjamanBarang,
    (peminjamanBarang) => peminjamanBarang.koleksi,
  )
  peminjamanBarang: PeminjamanBarang;

  // @ManyToOne(() => Barang, (barang) => barang.ruanganBarang)
  // barang: Barang;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
