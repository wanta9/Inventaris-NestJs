import { Koleksi } from '#/koleksi/entities/koleksi.entity';
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
export class PeminjamanBarang {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  jumlah: number;

  @OneToMany(() => Koleksi, (koleksi) => koleksi.peminjamanBarang)
  koleksi: Koleksi[];

  @ManyToOne(
    () => RuanganBarang,
    (ruanganBarang) => ruanganBarang.peminjamanBarang,
  )
  ruanganBarang: RuanganBarang;

  @ManyToOne(() => Peminjaman, (peminjaman) => peminjaman.peminjamanBarang)
  peminjaman: Peminjaman;

  // @ManyToOne(() => Barang, (barang) => barang.ruanganBarang)
  // barang: Barang;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
