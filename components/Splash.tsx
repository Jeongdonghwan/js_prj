// 첫 방문 인트로 — 로고가 아래에서 드러나고 금선이 그어진 뒤 위아래 막이 갈라진다 (약 2.6초).
// 움직임은 CSS 만으로 끝나고 마지막에 스스로 숨는다(JS 꺼져도 화면을 막지 않음).
// 새로고침·직접 접속은 매번 보인다. 사이트 안 링크로 옮겨 온 경우(같은 origin referrer + navigate)만 head 의 짧은 스크립트가 html.no-intro 를 붙여 건너뛴다. 클릭하면 바로 닫힌다(Motion.tsx).
import { BRAND, BRAND_EN } from '../lib/site';

export const introScript = `try{var n=performance.getEntriesByType('navigation')[0];if(n&&n.type==='navigate'&&document.referrer.indexOf(location.origin+'/')===0)document.documentElement.classList.add('no-intro')}catch(e){}`;

export default function Splash() {
  return (
    <div className="splash" aria-hidden="true">
      <i className="sp-panel top" />
      <i className="sp-panel bot" />
      <div className="sp-in">
        <span className="sp-mark"><img src="/mark-light.png" alt="JC 마크" width={769} height={457} /></span>
        <span className="sp-rule" />
        <b className="sp-name">{BRAND}</b>
        <small className="sp-sub">{BRAND_EN}</small>
      </div>
    </div>
  );
}
