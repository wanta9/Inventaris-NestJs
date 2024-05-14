import { RuanganBarang } from '#/ruangan-barang/entities/ruangan-barang.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum statusRusak {
  Diperbaiki = 'diperbaiki',
  Rusak = 'rusak',
}
@Entity()
export class BarangRusak {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  kode: string;

  @Column({ nullable: true })
  jumlah: number;

  @Column({ nullable: true })
  Status: statusRusak;

  @Column({ nullable: true })
  keterangan: string;

  @Column({ nullable: true })
  tanggalRusak: Date;

  @Column({ nullable: true })
  tanggalPerbaikan: Date;

  @ManyToOne(() => RuanganBarang, (ruanganBarang) => ruanganBarang.barangRusak)
  ruanganBarang: RuanganBarang;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
