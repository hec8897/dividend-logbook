import { CSSProperties, ElementType, ReactNode } from "react";

// 단축형 타입
export type JustifyShorthand =
  | "start"
  | "end"
  | "center"
  | "between"
  | "around"
  | "evenly";

export type AlignShorthand =
  | "start"
  | "end"
  | "center"
  | "stretch"
  | "baseline";

// Flex 속성 타입
export type JustifyContent =
  | JustifyShorthand
  | "flex-start"
  | "flex-end"
  | "space-between"
  | "space-around"
  | "space-evenly";

export type AlignItems = AlignShorthand | "flex-start" | "flex-end";

export type FlexDirection =
  | "row"
  | "column"
  | "row-reverse"
  | "column-reverse";

export type FlexWrap = "nowrap" | "wrap" | "wrap-reverse";

// FlexContainer Props
export interface FlexContainerProps {
  children: ReactNode;
  as?: ElementType;
  direction?: FlexDirection;
  justify?: JustifyContent;
  align?: AlignItems;
  wrap?: FlexWrap;
  gap?: number;
  fullHeight?: boolean;
  flex?: string | number;
  className?: string;
  style?: CSSProperties;
  onClick?: () => void;
}

