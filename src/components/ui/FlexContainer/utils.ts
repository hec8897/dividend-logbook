/**
 * justify 단축형을 CSS 표준형으로 변환
 * @param value - justify 값 (단축형 또는 표준형)
 * @returns CSS justify-content 값
 */
export const convertJustify = (value?: string): string => {
  const map: Record<string, string> = {
    start: "flex-start",
    end: "flex-end",
    between: "space-between",
    around: "space-around",
    evenly: "space-evenly",
  };
  return map[value || ""] || value || "flex-start";
};

/**
 * align 단축형을 CSS 표준형으로 변환
 * @param value - align 값 (단축형 또는 표준형)
 * @returns CSS align-items 값
 */
export const convertAlign = (value?: string): string => {
  const map: Record<string, string> = {
    start: "flex-start",
    end: "flex-end",
  };
  return map[value || ""] || value || "stretch";
};

