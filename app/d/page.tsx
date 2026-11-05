// 시안 D 사진형 — 레퍼런스(logsolution.imweb.me) 구조: 어두운 사진 히어로 → 흰 특징 띠 → 숫자 띠 → 본문
import { HeroD, StripD } from '../../components/Heroes';
import { BodyD, Band } from '../../components/Body';
import { Variants } from '../../components/Ui';

export default function D() {
  return (
    <main id="top" className="td">
      <HeroD />
      <StripD />
      <Band />
      <BodyD />
      <Variants cur="d" />
    </main>
  );
}
