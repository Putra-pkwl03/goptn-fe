// /lib/student/notification.ts

export async function updateStudentNotification(body: {
  wants_notification: boolean;
  notification_type: string[];
  campus_id: number | null;
}) {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE;

  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("Tidak ada token. Silakan login kembali.");
  }

  const res = await fetch(`${baseUrl}/student/notification-toggle`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || "Gagal update notifikasi");
  }

  return res.json();
}
