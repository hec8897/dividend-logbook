"use client";
import styled from "@emotion/styled";
import { FlexContainerProps } from "./types";
import { convertAlign, convertJustify } from "./utils";

// Styled Component
const StyledFlex = styled.div<FlexContainerProps>`
  display: flex;
  flex-direction: ${(props) => props.direction || "row"};
  justify-content: ${(props) => convertJustify(props.justify)};
  align-items: ${(props) => convertAlign(props.align)};
  flex-wrap: ${(props) => props.wrap || "nowrap"};
  gap: ${(props) => props.gap ?? 16}px;
  flex: ${(props) => props.flex || "initial"};
  height: ${(props) => (props.fullHeight ? "100%" : "auto")};
`;

/**
 * FlexContainer 컴포넌트
 *
 * Flexbox 레이아웃을 쉽게 구성할 수 있는 재사용 가능한 컴포넌트
 *
 * @example
 * ```tsx
 * <FlexContainer justify="between" align="center">
 *   <div>왼쪽</div>
 *   <div>오른쪽</div>
 * </FlexContainer>
 * ```
 *
 * @example
 * ```tsx
 * <FlexContainer direction="column" gap={24}>
 *   <Card />
 *   <Card />
 * </FlexContainer>
 * ```
 */
export default function FlexContainer({
  children,
  as = "div",
  direction = "row",
  justify = "start",
  align = "stretch",
  wrap = "nowrap",
  gap = 16,
  fullHeight = false,
  flex,
  className,
  style,
  onClick,
}: FlexContainerProps) {
  return (
    <StyledFlex
      as={as}
      direction={direction}
      justify={justify}
      align={align}
      wrap={wrap}
      gap={gap}
      fullHeight={fullHeight}
      flex={flex}
      className={className}
      style={style}
      onClick={onClick}>
      {children}
    </StyledFlex>
  );
}

