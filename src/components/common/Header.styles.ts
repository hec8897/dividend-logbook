import Link from "next/link";
import styled from "@emotion/styled";
import { theme } from "@/styles/theme";

// Header 관련 모든 스타일을 여기에 정의
export const StyledHeader = styled.header`
  border-bottom: 1px solid ${theme.colors.border};
  padding: ${theme.spacing.sm} ${theme.spacing.lg};
  background-color: ${theme.colors.background};
`;

export const StyledNav = styled.nav`
  display: flex;
  gap: ${theme.spacing.lg};
  align-items: center;
`;

// props를 받는 styled component
export const StyledLink = styled(Link, {
  shouldForwardProp: (prop) => prop !== "isActive",
})<{ isActive: boolean }>`
  color: ${(props) =>
    props.isActive ? theme.colors.primary : theme.colors.textSecondary};
  font-weight: ${(props) => (props.isActive ? "bold" : "normal")};
  text-decoration: none;
  transition: color ${theme.transition.default};
  padding: ${theme.spacing.xs} ${theme.spacing.sm};
  border-radius: ${theme.borderRadius.sm};

  &:hover {
    color: ${theme.colors.primary};
    background-color: ${theme.colors.backgroundSecondary};
  }
`;
