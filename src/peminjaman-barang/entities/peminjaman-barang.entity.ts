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

  // @OneToMany(() => BarangKeluar, (barangkeluar) => barangkeluar.ruanganBarang)
  // barangkeluar: BarangKeluar[];

  // @OneToMany(() => BarangRusak, (barangRusak) => barangRusak.ruanganBarang)
  // barangRusak: BarangRusak[];

  // @ManyToOne(() => Ruangan, (ruangan) => ruangan.ruanganBarang)
  // ruangan: Ruangan;

  // @ManyToOne(() => Barang, (barang) => barang.ruanganBarang)
  // barang: Barang;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
