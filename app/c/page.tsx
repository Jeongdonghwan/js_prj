// 시안 C 풀블리드 교차형 — components/CrossC.tsx
import { CrossC } from '../../components/CrossC';
import { Variants } from '../../components/Ui';

export default function C() {
  return (
    <main id="top" className="fc">
      <CrossC />
      <Variants cur="c" />
    </main>
  );
}
