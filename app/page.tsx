// 홈 — 히어로 components/Heroes.tsx, 본문 components/Body.tsx
import { HeroA } from '../components/Heroes';
import { BodyA } from '../components/Body';

export default function Home() {
  return (
    <main id="top" className="ta">
      <HeroA />
      <BodyA />
    </main>
  );
}
