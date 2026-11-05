// 히어로 A/B/C/D — A 타이포 다크(사진 배경), B 타이포 라이트(사진+체크 카드), C 큰 번호(사진 위 남색 기둥), D 사진형(로그솔루션 구조). 본문은 Body(v)
import { BRAND, CONTACT, tel } from '../lib/site';
import { CHECKS, STEPS, FACTS, TYPES } from '../lib/content';
import { Cta, IcPhone } from './Ui';

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
      <dl className="facts t-facts">{FACTS.map(([k, v], i) => <div key={k} data-reveal style={{ transitionDelay: `${i * 100}ms` }}><dt>{k}</dt><dd>{v}</dd></div>)}</dl>
    </div></div>
  </section>
);

// B 타이포 라이트 — 흰 바탕, 큰 제목, 왼쪽 설명+버튼 / 오른쪽 사진 위에 번호 체크 카드가 걸침, 아래 남색 띠. 모바일은 사진·카드가 먼저
export const HeroB = () => (
  <section className="hero hero-tb">
    <div className="wrap">
      <p className="hero-label">불법추심 대응 상담</p>
      <h1 className="hero-title t-title"><span><i>불법추심,</i></span><span><i>더 이상 <em>혼자</em></i></span><span><i>견디지 마세요.</i></span></h1>
      <div className="tb-row">
        <div className="tb-copy">
          <p className="hero-lead">갚아야 할 돈과 불법적인 독촉은 별개입니다. {BRAND}는 협박 전화·가족 연락·야간 방문을 기록으로 바꾸고, 신고와 차단까지 순서대로 함께합니다.</p>
          <Cta />
        </div>
        <figure className="tb-photo">
          <img src="/img/note.webp" alt="체크리스트를 적는 손" width={1600} height={1067} />
          <ol className="tb-checks reveal-group">{CHECKS.map((c) => <li key={c}>{c}</li>)}</ol>
        </figure>
      </div>
    </div>
    <Marquee />
  </section>
);

// C 큰 번호 — 연회색 바탕, 왼쪽 큰 제목, 오른쪽 어두운 책상 사진 위 남색 기둥에 진행 4단계 큰 숫자, 아래 흰 띠(역방향). 모바일은 기둥이 먼저
export const HeroC = () => (
  <section className="hero hero-tc">
    <div className="wrap tc-in">
      <div className="tc-copy">
        <p className="hero-label">불법추심 대응 상담</p>
        <h1 className="hero-title t-title"><span><i>협박 전화, 가족 연락,</i></span><span><i>야간 방문까지</i></span><span><i>전부 <em>신고</em>할 수 있습니다.</i></span></h1>
        <p className="hero-lead">기록하고, 신고하고, 끊어냅니다.<br />통화 기록만 있어도 상담을 시작할 수 있습니다.</p>
        <Cta />
      </div>
      <div className="tc-side">
        <img src="/img/desk.webp" alt="늦은 밤 책상 위 노트북과 휴대폰" width={1600} height={1067} />
        <ol className="tc-steps reveal-group">{STEPS.map(([t, d], i) => <li key={t}><span>{String(i + 1).padStart(2, '0')}</span><div><b>{t}</b><p>{d}</p></div></li>)}</ol>
      </div>
    </div>
    <Marquee />
  </section>
);

// D 사진형 — 레퍼런스(logsolution.imweb.me) 구조: 어두운 전체 폭 사진, 왼쪽 2줄 제목 + 설명 + 4칸 + 넓은 버튼 2개, 오른쪽 체크 패널
export const HeroD = () => (
  <section className="hero hero-td">
    <img className="td-bg" src="/img/despair.webp" alt="어두운 방에 혼자 앉아 있는 사람" width={1600} height={1067} />
    <div className="wrap td-in">
      <div className="td-copy">
        <h1 className="hero-title td-title"><span><i>불법추심, 더 이상 혼자 힘들어하지 마세요.</i></span><span><i>기록하고 <em>신고</em>해 끊어내겠습니다.</i></span></h1>
        <p className="hero-lead">협박 전화, 가족 연락, 야간 방문으로 고통받는 분들을 위해<br />기록 정리부터 신고·차단까지 순서대로 함께합니다.</p>
        <ol className="td-cols reveal-group">{STEPS.map(([t, d], i) => <li key={t}><span>{String(i + 1).padStart(2, '0')}</span><b>{t}</b><p>{d}</p></li>)}</ol>
        <Cta light />
      </div>
      <aside className="td-panel" data-reveal>
        <b>이런 상황, 혼자 고민하지 마세요</b>
        <ul className="hero-checks big">{CHECKS.map((c) => <li key={c}>{c}</li>)}</ul>
        <p>통화 기록만 있어도<br />상담을 시작할 수 있습니다.</p>
        <a href={tel} className="td-tel"><IcPhone />{CONTACT.phone}</a>
      </aside>
    </div>
  </section>
);

// D 히어로 아래 흰 띠 — 레퍼런스의 "4가지 특징" 자리. 아이콘 대신 번호, 근거 있는 문장만
const FEATS: [string, string][] = [
  ['기록 정리', '통화·문자·녹음·송금 내역을 날짜순으로 묶습니다'],
  ['법 기준 확인', '채권추심법이 금지한 행위인지 항목별로 짚습니다'],
  ['신고 순서 안내', '금융감독원 1332, 경찰 112 접수 순서를 잡습니다'],
  ['연락 차단', '신고 뒤 대응 문구와 차단 방법을 안내합니다'],
];
export const StripD = () => (
  <section className="td-strip">
    <div className="wrap td-strip-in">
      <h2 className="title" data-reveal>기록이 있으면<br /><em>신고할 수 있습니다.</em></h2>
      <ol className="td-feats reveal-group">{FEATS.map(([t, d], i) => <li key={t}><span>{String(i + 1).padStart(2, '0')}</span><b>{t}</b><p>{d}</p></li>)}</ol>
    </div>
  </section>
);
