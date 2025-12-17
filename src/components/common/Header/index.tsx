"use client";
import styled from "@emotion/styled";
import { FlexContainer } from "@/components/ui";
import { ChevronLeft, Search, Menu } from "lucide-react";
import { useRouter } from "next/navigation";

const HeaderContainer = styled.header`
  height: 64px;
  padding: 0 20px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
`;

export default function Header() {
  const { back } = useRouter();
  return (
    <HeaderContainer>
      <FlexContainer justify="space-between" align="center" fullHeight>
        <button onClick={back}>
          <ChevronLeft />
        </button>
        <h1>Dividend Logbook</h1>
        <FlexContainer>
          <Search />
          <Menu />
        </FlexContainer>
      </FlexContainer>
    </HeaderContainer>
  );
}
