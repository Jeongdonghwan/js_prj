// 히어로 — 타이포 다크(사진 배경), 흐르는 띠, 아이콘 숫자 띠
import { BRAND, CONTACT, tel } from '../lib/site';
import { RESULTS, TYPES, type Stat } from '../lib/content';
import { Cta } from './Ui';

// 선 아이콘 3개 — 달(야간), 퍼센트, 수화기
// 아이콘 + 라벨 + 큰 숫자 띠 (히어로 아래와 본문 중간, 같은 실적 4개). 숫자 값은 카운트업, 글자 값은 그대로
export const Stats = ({ cap, items }: { cap: React.ReactNode; items: Stat[] }) => (
  <div className="results" style={{ gridTemplateColumns: `150px repeat(${items.length}, 1fr)` }}>
    <p className="results-cap" data-reveal>{cap}</p>
    {items.map((r, i) => <div key={r.k} className="rt" data-reveal style={{ transitionDelay: `${i * 100}ms` }}><i className="ic">{IC[r.ic]}</i><div><span>{r.k}</span><b>{typeof r.v === 'number' ? <em data-count={r.v}>0</em> : r.v}{r.unit && <small>{r.unit}</small>}</b></div></div>)}
  </div>
);

const IC = {
  people: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="9" cy="8" r="3.2" /><circle cx="16.5" cy="9.5" r="2.5" /><path d="M3 19a6 6 0 0 1 12 0M14.5 15.5A4.5 4.5 0 0 1 21 19" /></svg>,
  shield: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 3 4.5 6v5.5c0 4.6 3.2 8 7.5 9.5 4.3-1.5 7.5-4.9 7.5-9.5V6z" /><path d="m8.8 12 2.2 2.2 4.3-4.4" /></svg>,
  gavel: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m13 5 6 6M9 9l6 6M3 21l8-8M15.5 2.5l6 6-3 3-6-6z" /><path d="M11 21h8" /></svg>,
  thumb: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M7 11v9H3.5v-9zM7 11l3.5-7.5a2 2 0 0 1 2 2V10h5.3a2 2 0 0 1 2 2.3l-1 6a2 2 0 0 1-2 1.7H7" /></svg>,
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
      <Stats cap={<>숫자로 보는<br />대응 결과</>} items={RESULTS} />
    </div></div>
  </section>
);
