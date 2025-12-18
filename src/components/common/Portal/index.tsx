"use client";
import { ReactNode, useEffect, useState } from "react";
import { createPortal } from "react-dom";

interface PortalProps {
  children: ReactNode;
  containerId?: string; // Portal을 렌더링할 컨테이너 ID (기본: 'portal-root')
}

/**
 * Portal 컴포넌트
 *
 * React Portal을 사용하여 자식 요소를 DOM 계층 구조 밖으로 렌더링합니다.
 * 주로 모달, 드롭다운, 툴팁 등에 사용됩니다.
 *
 * @example
 * ```tsx
 * <Portal>
 *   <Modal>모달 내용</Modal>
 * </Portal>
 * ```
 *
 * @example
 * ```tsx
 * // 특정 컨테이너에 렌더링
 * <Portal containerId="custom-portal">
 *   <Dropdown>드롭다운 내용</Dropdown>
 * </Portal>
 * ```
 */
export default function Portal({
  children,
  containerId = "portal-root",
}: PortalProps) {
  const [mounted, setMounted] = useState(false);
  const [container, setContainer] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setMounted(true);

    // 컨테이너 찾기 또는 생성
    let portalContainer = document.getElementById(containerId);

    if (!portalContainer) {
      portalContainer = document.createElement("div");
      portalContainer.id = containerId;
      document.body.appendChild(portalContainer);
    }

    setContainer(portalContainer);

    // 컴포넌트 언마운트 시 정리
    return () => {
      // 컨테이너가 비어있고 기본 portal-root인 경우 제거
      if (
        portalContainer &&
        containerId === "portal-root" &&
        portalContainer.childNodes.length === 0
      ) {
        document.body.removeChild(portalContainer);
      }
    };
  }, [containerId]);

  // SSR 중이거나 컨테이너가 없으면 null 반환
  if (!mounted || !container) {
    return null;
  }

  return createPortal(children, container);
}
