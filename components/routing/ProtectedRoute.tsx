"use client";

import { useRouter } from "next/navigation";

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  const localStorageExists = typeof window !== "undefined";
  const hasAccess =
    localStorageExists && JSON.parse(localStorage.getItem("user") || "null")?.access_token;

  if (!hasAccess && localStorageExists) {
    router.push("/login");
  }

  return <>{children}</>;
};
