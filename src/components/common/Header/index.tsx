"use client";
import styled from "@emotion/styled";
import { FlexContainer } from "@/components/ui";

const HeaderContainer = styled.header`
  height: 64px;
  padding: 0 20px;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
`;

export default function Header() {
  return (
    <HeaderContainer>
      <FlexContainer justify="space-between" align="center" fullHeight>
        <div>1</div>
        <h1>Dividend Logbook</h1>
        <div>1</div>
      </FlexContainer>
    </HeaderContainer>
  );
}
