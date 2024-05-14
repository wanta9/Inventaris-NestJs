import { RuanganBarang } from '#/ruangan-barang/entities/ruangan-barang.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

// Definisi enum di luar kelas

export enum KondisiBarang {
  Baik = 'baik',
  Rusak = 'rusak',
}
@Entity()
export class Barang {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  kode: string;

  @Column({ nullable: true })
  nama: string;

  @Column({ nullable: true })
  gambar: string;

  @Column({ nullable: true })
  kondisi: KondisiBarang;

  @Column({ type: 'text', nullable: true })
  deskripsi: string;

  @Column({ type: 'int', nullable: true })
  jumlah: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  harga: number;

  @OneToMany(() => RuanganBarang, (ruanganBarang) => ruanganBarang.barang)
  ruanganBarang: RuanganBarang[];

  // @OneToMany(() => BarangMasuk, (barangMasuk) => barangMasuk.barang)
  // barangMasuk: BarangMasuk[];

  // @OneToMany(() => BarangKeluar, (barangKeluar) => barangKeluar.barang)
  // barangKeluar: BarangKeluar[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
