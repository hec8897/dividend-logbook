"use client";
import styled from "@emotion/styled";

import { FlexContainer, Overlay } from "@/components/ui";
import { ChevronLeft, Search, Menu } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const HeaderContainer = styled.header`
  height: 64px;
  padding: 0 20px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  font-size: 20px;
  font-weight: 600;
`;

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { back } = useRouter();
  return (
    <>
      <HeaderContainer>
        <FlexContainer justify="space-between" align="center" fullHeight>
          <button onClick={back}>
            <ChevronLeft />
          </button>
          <Title>Dividend Logbook</Title>
          <FlexContainer>
            <Search />
            <Menu onClick={() => setIsMenuOpen(true)} />
          </FlexContainer>
        </FlexContainer>
      </HeaderContainer>
      {isMenuOpen && (
        <Overlay isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)}>
          <div>Menu</div>
        </Overlay>
      )}
    </>
  );
}
