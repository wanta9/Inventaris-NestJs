import { IsNotEmpty } from 'class-validator';

enum statusPeminjaman {
  Diterima = 'diterima',
  Ditolak = 'ditolak',
  Dibatalkan = 'dibatalkan',
  Selesai = 'selesai',
  Telat = 'telat',
}
export class CreatePeminjamanDto {
  @IsNotEmpty()
  peminjamId: string;

  @IsNotEmpty()
  kode: string;

  @IsNotEmpty()
  tanggalPinjam: Date;

  @IsNotEmpty()
  tanggalPengembalian: Date;

  @IsNotEmpty()
  tanggalDikembalikan: Date;

  @IsNotEmpty()
  status: statusPeminjaman;
}
