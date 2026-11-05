// 시안 B 핀테크 스토리형 — components/StoryB.tsx
import { StoryB } from '../../components/StoryB';
import { Variants } from '../../components/Ui';

export default function B() {
  return (
    <main id="top" className="fb">
      <StoryB />
      <Variants cur="b" />
    </main>
  );
}
