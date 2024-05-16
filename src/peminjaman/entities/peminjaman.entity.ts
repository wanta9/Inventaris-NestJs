import { Peminjam } from '#/peminjam/entities/peminjam.entity';
import { PeminjamanBarang } from '#/peminjaman-barang/entities/peminjaman-barang.entity';
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
export class Peminjaman {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  kode: string;

  @Column({ nullable: true })
  tanggalPinjam: Date;

  @Column({ nullable: true })
  tanggalPengembalian: Date;

  @Column({ nullable: true })
  tanggalDikembalikan: Date;

  @Column({ nullable: true })
  status: string;

  @OneToMany(
    () => PeminjamanBarang,
    (peminjamanBarang) => peminjamanBarang.peminjaman,
  )
  peminjamanBarang: PeminjamanBarang[];

  @ManyToOne(() => Peminjam, (peminjam) => peminjam.peminjaman)
  peminjam: Peminjam;
  // @OneToMany(() => BarangKeluar, (barangkeluar) => barangkeluar.ruanganBarang)
  // barangkeluar: BarangKeluar[];

  // @ManyToOne(() => Barang, (barang) => barang.ruanganBarang)
  // barang: Barang;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
