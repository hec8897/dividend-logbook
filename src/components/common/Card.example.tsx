"use client";

import {
  Card,
  CompactCard,
  InteractiveCard,
  HeadingSmall,
  Text,
  TextBold,
  TextSmall,
} from "@/styles/common.styles";

// styled components 합성 사용 예시
export default function CardExamples() {
  return (
    <div style={{ display: "flex", gap: "1rem", padding: "2rem" }}>
      {/* 기본 Card */}
      <Card>
        <HeadingSmall>기본 카드</HeadingSmall>
        <Text>이것은 기본 카드입니다.</Text>
      </Card>

      {/* Card를 확장한 CompactCard */}
      <CompactCard>
        <HeadingSmall>컴팩트 카드</HeadingSmall>
        <TextSmall>패딩이 작은 카드입니다.</TextSmall>
      </CompactCard>

      {/* Card를 확장한 InteractiveCard */}
      <InteractiveCard>
        <HeadingSmall>인터랙티브 카드</HeadingSmall>
        <TextBold>호버 시 애니메이션이 있습니다.</TextBold>
      </InteractiveCard>
    </div>
  );
}

