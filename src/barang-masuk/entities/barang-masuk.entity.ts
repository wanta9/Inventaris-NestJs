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

@Entity()
export class BarangMasuk {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  kode: string;

  @Column({ nullable: true })
  jumlah: number;

  @Column({ nullable: true })
  harga: number;

  @Column({ nullable: true })
  keterangan: string;

  @Column({ nullable: true })
  tanggalMasuk: Date;

  @ManyToOne(() => RuanganBarang, (ruanganBarang) => ruanganBarang.barangMasuk)
  ruanganBarang: RuanganBarang;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
