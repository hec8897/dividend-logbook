import styled from "@emotion/styled";
import { theme } from "./theme";

// 공통으로 사용되는 스타일 컴포넌트들

// 공통 컨테이너
export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${theme.spacing.md};
`;

// 공통 버튼 스타일 (베이스)
export const BaseButton = styled.button`
  padding: ${theme.spacing.xs} ${theme.spacing.sm};
  border-radius: ${theme.borderRadius.sm};
  border: none;
  cursor: pointer;
  font-size: ${theme.fontSize.base};
  transition: all ${theme.transition.default};
  font-weight: 500;

  &:hover {
    opacity: 0.9;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

// BaseButton을 확장한 PrimaryButton (합성 예시 1)
export const PrimaryButton = styled(BaseButton)`
  background-color: ${theme.colors.primary};
  color: white;

  &:hover {
    background-color: #1d4ed8;
  }
`;

// BaseButton을 확장한 SecondaryButton (합성 예시 2)
export const SecondaryButton = styled(BaseButton)`
  background-color: ${theme.colors.backgroundSecondary};
  color: ${theme.colors.text};
  border: 1px solid ${theme.colors.border};

  &:hover {
    background-color: ${theme.colors.border};
  }
`;

// BaseButton을 확장한 OutlineButton (합성 예시 3)
export const OutlineButton = styled(BaseButton)`
  background-color: transparent;
  color: ${theme.colors.primary};
  border: 1px solid ${theme.colors.primary};

  &:hover {
    background-color: ${theme.colors.primary};
    color: white;
  }
`;

// 공통 카드 스타일
export const Card = styled.div`
  background-color: ${theme.colors.background};
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.md};
  padding: ${theme.spacing.md};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: box-shadow ${theme.transition.default};

  &:hover {
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  }
`;

// Card를 확장한 CompactCard (합성 예시 4)
export const CompactCard = styled(Card)`
  padding: ${theme.spacing.sm};
`;

// Card를 확장한 InteractiveCard (합성 예시 5)
export const InteractiveCard = styled(Card)`
  cursor: pointer;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }
`;

// 공통 입력 필드 스타일
export const Input = styled.input`
  padding: ${theme.spacing.xs} ${theme.spacing.sm};
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.sm};
  font-size: ${theme.fontSize.base};
  color: ${theme.colors.text};
  transition: border-color ${theme.transition.default};

  &:focus {
    outline: none;
    border-color: ${theme.colors.primary};
  }
`;

// Input을 확장한 TextArea (합성 예시 6)
export const TextArea = styled.textarea`
  padding: ${theme.spacing.xs} ${theme.spacing.sm};
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.borderRadius.sm};
  font-size: ${theme.fontSize.base};
  color: ${theme.colors.text};
  transition: border-color ${theme.transition.default};
  min-height: 100px;
  resize: vertical;

  &:focus {
    outline: none;
    border-color: ${theme.colors.primary};
  }
`;

// Input을 확장한 SearchInput (합성 예시 7)
export const SearchInput = styled(Input)`
  padding-left: ${theme.spacing.lg};
  background-image: url("data:image/svg+xml,...");
  background-repeat: no-repeat;
  background-position: left ${theme.spacing.xs} center;
`;

// 공통 제목 스타일
export const Heading = styled.h2`
  font-size: ${theme.fontSize.xl};
  font-weight: bold;
  color: ${theme.colors.text};
  margin-bottom: ${theme.spacing.md};
`;

// Heading을 확장한 다양한 크기 (합성 예시 8)
export const HeadingLarge = styled(Heading)`
  font-size: ${theme.fontSize["2xl"]};
`;

export const HeadingSmall = styled(Heading)`
  font-size: ${theme.fontSize.lg};
`;

// 공통 텍스트 스타일
export const Text = styled.p`
  font-size: ${theme.fontSize.base};
  color: ${theme.colors.textSecondary};
  line-height: 1.6;
`;

// Text를 확장한 다양한 변형 (합성 예시 9)
export const TextBold = styled(Text)`
  font-weight: bold;
  color: ${theme.colors.text};
`;

export const TextSmall = styled(Text)`
  font-size: ${theme.fontSize.sm};
`;
