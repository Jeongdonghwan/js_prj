// 시안 A 타이포 다크 — 히어로는 components/Heroes.tsx, 본문은 components/Body.tsx (A/B/C 공유)
import { HeroA } from '../components/Heroes';
import { BodyA } from '../components/Body';
import { Variants } from '../components/Ui';

export default function Home() {
  return (
    <main id="top" className="ta">
      <HeroA />
      <BodyA />
      <Variants cur="a" />
    </main>
  );
}
