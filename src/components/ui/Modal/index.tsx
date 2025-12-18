"use client";
import styled from "@emotion/styled";
import { ReactNode } from "react";
import { FlexContainer } from "@/components/ui";
import Overlay from "../Overlay";
import { theme } from "@/styles/theme";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string;
  width?: number | string;
  showCloseButton?: boolean;
}

const ModalContainer = styled.div<{ width?: number | string }>`
  background: white;
  border-radius: ${theme.borderRadius.lg};
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1),
    0 10px 10px -5px rgba(0, 0, 0, 0.04);
  max-width: 90vw;
  max-height: 90vh;
  width: ${(props) =>
    typeof props.width === "number" ? `${props.width}px` : props.width};
  overflow: hidden;
`;

const ModalHeader = styled.header`
  padding: ${theme.spacing.lg};
  border-bottom: 1px solid ${theme.colors.border};
`;

const ModalTitle = styled.h2`
  font-size: ${theme.fontSize.xl};
  font-weight: 600;
  color: ${theme.colors.text};
  margin: 0;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: ${theme.fontSize.xl};
  color: ${theme.colors.textSecondary};
  cursor: pointer;
  padding: 0;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: ${theme.borderRadius.sm};
  transition: all ${theme.transition.default};

  &:hover {
    background-color: ${theme.colors.backgroundSecondary};
    color: ${theme.colors.text};
  }
`;

const ModalContent = styled.div`
  padding: ${theme.spacing.lg};
  overflow-y: auto;
  max-height: calc(90vh - 100px);
`;

/**
 * Modal 컴포넌트
 *
 * Overlay를 사용하는 모달 컴포넌트
 *
 * @example
 * ```tsx
 * const [isOpen, setIsOpen] = useState(false);
 *
 * <Modal
 *   isOpen={isOpen}
 *   onClose={() => setIsOpen(false)}
 *   title="제목"
 *   width={500}
 * >
 *   <p>모달 내용</p>
 * </Modal>
 * ```
 */
export default function Modal({
  isOpen,
  onClose,
  children,
  title,
  width = 500,
  showCloseButton = true,
}: ModalProps) {
  return (
    <Overlay isOpen={isOpen} onClose={onClose}>
      <ModalContainer width={width}>
        {(title || showCloseButton) && (
          <ModalHeader>
            <FlexContainer justify="between" align="center" gap={0}>
              {title && <ModalTitle>{title}</ModalTitle>}
              {showCloseButton && (
                <CloseButton onClick={onClose} aria-label="닫기">
                  ×
                </CloseButton>
              )}
            </FlexContainer>
          </ModalHeader>
        )}
        <ModalContent>{children}</ModalContent>
      </ModalContainer>
    </Overlay>
  );
}
