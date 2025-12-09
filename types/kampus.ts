// export interface Major {
//   id: number;
//   campus_id: number;
//   nama_jurusan: string;
//   fakultas: string;
//   akreditasi: string;
//   kapasitas: number;
//   created_at: string;
//   updated_at: string;
// }

// export interface Kampus {
//   id: number;
//   nama_kampus: string;
//   akronim: string;
//   kota: string;
//   website: string;
//   akreditasi: string;
//   created_at: string;
//   updated_at: string;
//   majors: Major[];
// }


export interface Major {
  id: number;
  campus_id: number;
  nama_jurusan: string;
  fakultas: string;
  akreditasi: string;
  kapasitas: number;
  peminat: number;
  diterima: number;
  tingkat: string;
  created_at: string;
  updated_at: string;
}

export interface Kampus {
  id: number;
  nama_kampus: string;
  akronim: string;
  alamat: string;
  kota: string;
  website: string;
  akreditasi: string;
  deskripsi: string;
  jalur_masuk: string[];
  total_program_studi: number;
  created_at: string;
  updated_at: string;
  majors: Major[];
}

