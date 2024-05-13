import { Akun } from '#/akun/entities/akun.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

export enum rolePeran {
  Admin = 'admin',
  Petugas = 'petugas',
  Peminjam = 'peminjam',
}

@Entity()
export class Peran {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  Role: rolePeran;

  @OneToMany(() => Akun, (akun) => akun.peran)
  akun: Akun[];

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
