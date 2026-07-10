// ============================================================
// Admin Layout — Server Component
// يحمي كل صفحات /admin بالتحقق من session + role
// ============================================================

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import AdminShell from "@/components/admin/admin-shell";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login?callbackUrl=/admin");
  }

  if (session.user.role !== "admin") {
    redirect("/?error=unauthorized");
  }

  return <AdminShell user={session.user}>{children}</AdminShell>;
}
