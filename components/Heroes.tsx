// 히어로 — 타이포 다크(사진 배경), 흐르는 띠, 아이콘 숫자 띠
import { BRAND, CONTACT, tel } from '../lib/site';
import { RESULTS, TYPES } from '../lib/content';
import { Cta } from './Ui';

// 선 아이콘 3개 — 달(야간), 퍼센트, 수화기
const IC = {
  moon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5z" /></svg>,
  percent: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true"><path d="M19 5 5 19" /><circle cx="7.5" cy="7.5" r="2.5" /><circle cx="16.5" cy="16.5" r="2.5" /></svg>,
  phone: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z" /></svg>,
};

const Marquee = () => <div className="marquee" aria-hidden="true"><div className="marquee-in">{[...TYPES, ...TYPES].map(([t], i) => <span key={i}>{t}</span>)}</div></div>;

// A 타이포 다크 — 남색 바탕 + 휴대폰 쥔 손 사진, 아주 큰 3줄 제목, 흐르는 띠, 숫자 3칸
export const HeroA = () => (
  <section className="hero hero-ta">
    <img className="ta-bg" src="/img/hero.webp" alt="휴대폰을 쥔 손" width={1800} height={1200} />
    <div className="wrap ta-in">
      <p className="hero-label">불법추심 대응 상담 · {BRAND}</p>
      <h1 className="hero-title t-title"><span><i>빚이 있어도</i></span><span><i><em>불법추심</em>까지</i></span><span><i>견딜 의무는 없습니다.</i></span></h1>
      <div className="t-row">
        <p className="hero-lead">협박 전화와 가족 연락, 야간 방문은 채권추심법이 금지한 행위입니다.<br />{BRAND}는 기록 정리부터 신고·차단까지 순서대로 함께합니다.</p>
        <Cta light />
      </div>
    </div>
    <Marquee />
    <div className="ta-foot"><div className="wrap">
      <div className="results">
        <p className="results-cap" data-reveal>법이 정한<br />기준</p>
        {RESULTS.map((r, i) => <div key={r.k} className="rt" data-reveal style={{ transitionDelay: `${i * 100}ms` }}><i className="ic">{IC[r.ic]}</i><div><span>{r.k}</span><b>{r.v}{r.unit && <small>{r.unit}</small>}</b></div></div>)}
      </div>
    </div></div>
  </section>
);
