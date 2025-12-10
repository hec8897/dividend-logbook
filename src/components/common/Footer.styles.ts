import styled from "@emotion/styled";
import { theme } from "@/styles/theme";

// Footer 관련 스타일
export const StyledFooter = styled.footer`
  border-top: 1px solid ${theme.colors.border};
  padding: ${theme.spacing.lg};
  text-align: center;
  color: ${theme.colors.textSecondary};
  background-color: ${theme.colors.backgroundSecondary};
`;
