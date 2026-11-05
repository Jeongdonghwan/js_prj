// 시안 E 다크 앱형 + 상황 선택기 — components/AppE.tsx
import { AppE } from '../../components/AppE';
import { Variants } from '../../components/Ui';

export default function E() {
  return (
    <main id="top" className="fe">
      <AppE />
      <Variants cur="e" />
    </main>
  );
}
