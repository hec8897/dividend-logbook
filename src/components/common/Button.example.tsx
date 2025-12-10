"use client";

import {
  BaseButton,
  PrimaryButton,
  SecondaryButton,
  OutlineButton,
} from "@/styles/common.styles";

// styled components 합성 사용 예시
export default function ButtonExamples() {
  return (
    <div style={{ display: "flex", gap: "1rem", padding: "2rem" }}>
      {/* BaseButton 직접 사용 */}
      <BaseButton>Base Button</BaseButton>

      {/* BaseButton을 확장한 PrimaryButton */}
      <PrimaryButton>Primary Button</PrimaryButton>

      {/* BaseButton을 확장한 SecondaryButton */}
      <SecondaryButton>Secondary Button</SecondaryButton>

      {/* BaseButton을 확장한 OutlineButton */}
      <OutlineButton>Outline Button</OutlineButton>
    </div>
  );
}

