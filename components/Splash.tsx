// 첫 방문 인트로 — 로고가 아래에서 드러나고 금선이 그어진 뒤 위아래 막이 갈라진다 (약 2.6초).
// 움직임은 CSS 만으로 끝나고 마지막에 스스로 숨는다(JS 꺼져도 화면을 막지 않음).
// 같은 탭에서 두 번째 페이지부터는 head 의 짧은 스크립트가 html.no-intro 를 붙여 건너뛴다. 클릭하면 바로 닫힌다(Motion.tsx).
import { BRAND, BRAND_EN } from '../lib/site';

export const introScript = `try{if(sessionStorage.getItem('jc-intro'))document.documentElement.classList.add('no-intro');else sessionStorage.setItem('jc-intro','1')}catch(e){}`;

export default function Splash() {
  return (
    <div className="splash" aria-hidden="true">
      <i className="sp-panel top" />
      <i className="sp-panel bot" />
      <div className="sp-in">
        <span className="sp-mark"><img src="/mark-light.png" alt="" width={769} height={457} /></span>
        <span className="sp-rule" />
        <b className="sp-name">{BRAND}</b>
        <small className="sp-sub">{BRAND_EN}</small>
      </div>
    </div>
  );
}
