import type { Kampus } from "@/types/kampus";

export async function getKampus(): Promise<Kampus[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/campus`, {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Gagal mengambil data kampus");

  return res.json();
}

export async function getKampusById(id: number): Promise<Kampus> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE}/campus/${id}`, {
    method: "GET",
    headers: { Accept: "application/json" },
    cache: "no-store",
  });

  if (!res.ok) throw new Error(`Gagal mengambil data kampus dengan ID ${id}`);

  const data = await res.json();

  return {
    ...data,
    jalur_masuk: JSON.parse(data.jalur_masuk),
  };
}
