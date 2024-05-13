import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';

import { Peran } from '#/peran/entities/peran.entity';
import { IsEmail, IsOptional, Length } from 'class-validator';
import { Peminjam } from '#/peminjam/entities/peminjam.entity';
import { Petugas } from '#/petugas/entities/petugas.entity';

export enum statusBarang {
  Aktif = 'aktif',
  TidakAktif = 'tidak aktif',
  Pending = 'pending',
  Diterima = 'ditrima',
  Ditolak = 'ditolak',
}

@Entity()
export class Akun {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  @IsOptional()
  username: string;

  @Column({ nullable: true })
  @Length(6, 100)
  password: string;

  @Column({ nullable: true })
  @Length(1, 255)
  nama: string;

  @Column({ nullable: true })
  gambar: string;

  @Column({ nullable: true })
  @IsEmail()
  email: string;

  @Column({ nullable: true })
  @Length(6, 15)
  telp: string;

  @Column({ nullable: true })
  status: statusBarang;

  @Column({ default: false })
  isOnline: boolean;

  @Column({ nullable: true })
  salt: string;

  @ManyToOne(() => Peran, (peran) => peran.akun)
  peran: Peran;

  @OneToMany(() => Peminjam, (peminjam) => peminjam.akun)
  peminjam: Peminjam[];

  @OneToMany(() => Petugas, (petugas) => petugas.akun)
  petugas: Petugas[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
