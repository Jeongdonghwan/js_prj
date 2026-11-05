// 공통 조각: 상담 버튼, HTML 폰 화면(한 사례), 사례 슬라이더, 플로팅 버튼, 시안 전환 탭
import { CASES } from '../lib/content';
import { CONTACT, tel } from '../lib/site';

export const IcTalk = () => <svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 3C6.5 3 2 6.6 2 11c0 2.8 1.9 5.3 4.7 6.7l-1 3.6 4.2-2.8c.7.1 1.4.2 2.1.2 5.5 0 10-3.6 10-8S17.5 3 12 3z" /></svg>;
export const IcPhone = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z" /></svg>;
const IcUp = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 19V5M5 12l7-7 7 7" /></svg>;

export const Cta = ({ center, light }: { center?: boolean; light?: boolean }) => (
  <div className={`cta${center ? ' center' : ''}`}>
    <a className="btn kakao" href={CONTACT.kakao}><IcTalk /><span>카카오톡 상담</span></a>
    <a className={`btn ${light ? 'white' : 'navy'}`} href={tel}><IcPhone /><span>전화 상담 {CONTACT.phone}</span></a>
  </div>
);

// 폰 화면 한 장 — 이미지가 아니라 HTML 말풍선. 화면에 들어오면 한 줄씩 올라온다(.ph-body.reveal-group).
export const Phone = ({ c, hero }: { c: (typeof CASES)[number]; hero?: boolean }) => (
  <div className={`phone${hero ? ' hero-phone' : ''}`}>
    <p className="ph-from">{c.from}</p>
    <div className="ph-body reveal-group">
      {c.msgs.map((m, i) => <div key={i} className={`msg${m.me ? ' me' : ''}`}><p>{m.t}</p><time>{m.at}</time></div>)}
    </div>
  </div>
);

export const CaseCopy = ({ c }: { c: (typeof CASES)[number] }) => (
  <div className="case-copy"><span className="tag">{c.result}</span><b>{c.title}</b><small>{c.who}</small></div>
);

export const CASE_NOTE = '대응 전 협박 메시지와 대응 후 달라진 반응입니다. 화면은 예시이며 실제 사례는 당사자 동의와 개인정보 가림 뒤 게시합니다.';

export const Cases = () => (
  <section className="sec soft cases" id="cases">
    <div className="wrap">
      <div className="head" data-reveal>
        <div><h2 className="title">실제 사례</h2><p>{CASE_NOTE}</p></div>
      </div>
    </div>
    {/* 사례가 띠처럼 계속 흐른다(CSS marquee). 두 벌을 이어 붙여 끊김 없이 돈다. 손을 올리면 멈춤 */}
    <div className="rail-wrap">
      <ul className="rail" id="case-rail">{[...CASES, ...CASES].map((c, i) => <li key={i} className="case" aria-hidden={i >= CASES.length || undefined}><Phone c={c} /><CaseCopy c={c} /></li>)}</ul>
    </div>
  </section>
);

export const Floating = () => (
  <nav className="float" aria-label="빠른 상담">
    <a href={CONTACT.kakao} className="fl kakao"><IcTalk /><span>카카오톡<br />상담</span></a>
    <a href={tel} className="fl call"><IcPhone /><span>전화<br />상담</span></a>
    <a href="#top" className="fl top" aria-label="맨 위로"><IcUp /><span>TOP</span></a>
  </nav>
);

// 시안 전환 탭 — 초안 확인용. 채택 뒤 지운다.
export const Variants = ({ cur }: { cur: 'a' | 'b' | 'c' | 'd' | 'e' }) => (
  <nav className="variants" aria-label="시안">
    <span>시안</span>
    {[['a', '/', 'A'], ['b', '/b/', 'B'], ['c', '/c/', 'C'], ['d', '/d/', 'D'], ['e', '/e/', 'E']].map(([k, h, l]) => <a key={k} href={h} className={k === cur ? 'on' : ''}>{l}</a>)}
  </nav>
);
