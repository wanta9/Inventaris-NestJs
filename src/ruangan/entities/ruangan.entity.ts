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

@Entity()
export class Ruangan {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  Letak_Barang: string;

  @OneToMany(() => RuanganBarang, (ruanganBarang) => ruanganBarang.ruangan)
  ruanganBarang: RuanganBarang[];

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
