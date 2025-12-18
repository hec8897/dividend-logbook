"use client";
import styled from "@emotion/styled";
import { ReactNode, useEffect } from "react";
import { FlexContainer } from "@/components/ui";

interface OverlayProps {
  isOpen: boolean;
  onClose?: () => void;
  children: ReactNode;
  //   position?: "center" | "top" | "bottom";
  closeOnOverlayClick?: boolean;
  closeOnEsc?: boolean;
  preventBodyScroll?: boolean;
}

const OverlayWrapper = styled.div`
  position: fixed;
  inset: 0;
  z-index: 1000;
  background-color: rgba(0, 0, 0, 0.5);
  animation: fadeIn 0.2s ease-in-out;

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

const ContentWrapper = styled.div`
  animation: slideUp 0.2s ease-in-out;

  @keyframes slideUp {
    from {
      transform: translateY(20px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
`;

/**
 * Overlay 컴포넌트
 *
 * position: fixed를 사용한 간단한 오버레이 컴포넌트
 * 모달, 드롭다운, 전체화면 로딩 등에 활용 가능
 *
 * @example
 * ```tsx
 * <Overlay isOpen={isOpen} onClose={() => setIsOpen(false)}>
 *   <div>오버레이 내용</div>
 * </Overlay>
 * ```
 */
export default function Overlay({
  isOpen,
  onClose,
  children,
  closeOnOverlayClick = true,
  closeOnEsc = true,
  preventBodyScroll = true,
}: OverlayProps) {
  // ESC 키로 닫기
  useEffect(() => {
    if (!closeOnEsc || !isOpen || !onClose) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose, closeOnEsc]);

  // body 스크롤 방지
  useEffect(() => {
    if (!preventBodyScroll) return;

    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen, preventBodyScroll]);

  if (!isOpen) return null;

  const handleOverlayClick = () => {
    if (closeOnOverlayClick && onClose) {
      onClose();
    }
  };

  return (
    <OverlayWrapper onClick={handleOverlayClick}>
      <FlexContainer
        justify="center"
        align="center"
        fullHeight
        style={{ width: "100%" }}>
        <ContentWrapper onClick={(e) => e.stopPropagation()}>
          {children}
        </ContentWrapper>
      </FlexContainer>
    </OverlayWrapper>
  );
}
