"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();

  return (
    <header style={{ borderBottom: "1px solid #e0e0e0", padding: "1rem 2rem" }}>
      <nav style={{ display: "flex", gap: "2rem" }}>
        <Link
          href="/"
          style={{
            color: pathname === "/" ? "#2563eb" : "#666",
            fontWeight: pathname === "/" ? "bold" : "normal",
          }}
        >
          홈
        </Link>
        <Link
          href="/etf"
          style={{
            color: pathname === "/etf" ? "#2563eb" : "#666",
            fontWeight: pathname === "/etf" ? "bold" : "normal",
          }}
        >
          ETF 관리
        </Link>
      </nav>
    </header>
  );
}

