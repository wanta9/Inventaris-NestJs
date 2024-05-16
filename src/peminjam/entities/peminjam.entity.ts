import { Akun } from '#/akun/entities/akun.entity';
import { Peminjaman } from '#/peminjaman/entities/peminjaman.entity';
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
export class Peminjam {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  NISN: number;

  @Column({ nullable: true })
  kelas: string;

  @ManyToOne(() => Akun, (akun) => akun.peminjam)
  akun: Akun;

  @OneToMany(() => Peminjaman, (peminjaman) => peminjaman.peminjam)
  peminjaman: Peminjaman[];
  @CreateDateColumn({
    type: 'timestamp with time zone',
    nullable: false,
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp with time zone',
    nullable: false,
  })
  updatedAt: Date;

  @DeleteDateColumn({
    type: 'timestamp with time zone',
    nullable: true,
  })
  deletedAt: Date;
}
