"use client";

import { usePathname } from "next/navigation";
import { StyledHeader, StyledNav, StyledLink } from "./Header.styles";

export default function Header() {
  const pathname = usePathname();

  return (
    <StyledHeader>
      <StyledNav>
        <StyledLink href="/" isActive={pathname === "/"}>
          홈
        </StyledLink>
        <StyledLink href="/etf" isActive={pathname === "/etf"}>
          ETF 관리
        </StyledLink>
      </StyledNav>
    </StyledHeader>
  );
}
