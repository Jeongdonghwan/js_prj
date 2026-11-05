// 시안 E 다크 앱형 — 아주 어두운 바탕, 카드 UI, 히어로 오른쪽 상황 선택기(CSS만: 라디오 + :checked ~). 사진: 히어로 배경, 진행 카드 머리, 유형 모자이크, 기록·마무리 사진 띠
import { STEPS, RECORDS, OFFICES, FACTS, TYPES, CASES } from '../lib/content';
import { CONTACT, tel } from '../lib/site';
import { Cta, Phone, CaseCopy, CASE_NOTE } from './Ui';
import { Faq } from './Body';

const no = (i: number) => String(i + 1).padStart(2, '0');

const PICKS = [
  { k: '가족·지인 연락', t: '가족이나 직장에 알리겠다는 협박', law: '채무 사실을 제3자에게 알리거나 알리겠다고 압박하는 것은 채권추심법이 금지한 행위입니다.', todo: '문자·메시지를 지우지 말고 날짜가 보이게 보관', to: '금융감독원 1332 → 경찰 112' },
  { k: '야간·반복 전화', t: '밤낮없이 걸려 오는 전화와 문자', law: '밤 9시~아침 8시 연락, 반복 연락, 욕설·협박은 금지 행위입니다.', todo: '통화 목록을 날짜·시간이 보이게 캡처', to: '금융감독원 1332' },
  { k: '원금 초과 이자', t: '원금보다 커지는 이자 요구', law: '법정 최고이자율은 연 20%. 넘는 이자는 지급 의무가 없습니다.', todo: '송금 내역을 날짜순으로 정리', to: '금융감독원 1332 · 법률구조공단 132' },
  { k: '사진·정보 유포', t: '사진·개인정보를 뿌리겠다는 위협', law: '개인정보·사진 유포 협박은 형사 처벌 대상입니다.', todo: '차단하기 전에 대화 화면부터 캡처', to: '경찰 112 → 금융감독원 1332' },
];
const STEP_IMG = [['/img/window.webp', '창가에 서 있는 사람의 실루엣'], ['/img/note.webp', '체크리스트를 적는 손'], ['/img/sign.webp', '서류에 서명하는 손'], ['/img/sea.webp', '창가에 앉아 바다를 보는 사람']];
const TYPE_IMG = [['/img/despair.webp', '어두운 방에 혼자 앉아 있는 사람'], ['/img/hands.webp', '휴대폰을 쥔 두 손'], ['/img/bills.webp', '서류와 계산기'], ['/img/desk.webp', '늦은 밤 책상 위 노트북과 휴대폰'], ['/img/road.webp', '밤의 도로'], ['/img/office2.webp', '빈 사무실']];

export const AppE = () => (
  <>
    <section className="hero hero-fe">
      <img className="fe-bg" src="/img/city.webp" alt="밤의 건물 창문들" width={960} height={640} />
      <div className="wrap fe-in">
        <div>
          <p className="hero-label">불법추심 대응 상담</p>
          <h1 className="hero-title fe-title"><span><i>협박 전화, 가족 연락,</i></span><span><i>전부 <em>신고</em>할 수 있습니다</i></span></h1>
          <p className="hero-lead">상황을 고르면 법 기준과 오늘 할 일, 신고처를 바로 보여 드립니다.</p>
          <Cta light />
        </div>
        <div className="picker card" data-reveal>
          {PICKS.map((p, i) => <input key={p.k} type="radio" name="pick" id={`pk${i}`} defaultChecked={i === 0} />)}
          <p className="picker-head">지금 상황을 고르세요</p>
          <div className="picker-tabs">{PICKS.map((p, i) => <label key={p.k} htmlFor={`pk${i}`}>{p.k}</label>)}</div>
          <div className="picker-panels">{PICKS.map((p) => <div key={p.k} className="pick-panel"><b>{p.t}</b><dl><dt>법은 이렇게 봅니다</dt><dd>{p.law}</dd><dt>지금 할 일</dt><dd>{p.todo}</dd><dt>신고처</dt><dd>{p.to}</dd></dl></div>)}</div>
        </div>
      </div>
    </section>

    <div className="wrap fe-body">
      <section className="fe-sec" id="process">
        <h2 className="fe-h" data-reveal>기록부터 신고까지, 네 단계</h2>
        <ol className="fe-cards pic reveal-group">{STEPS.map(([t, d], i) => <li key={t} className="card"><img src={STEP_IMG[i][0]} alt={STEP_IMG[i][1]} loading="lazy" width={1600} height={1067} /><div><span>{no(i)}</span><b>{t}</b><p>{d}</p></div></li>)}</ol>
      </section>
      <section className="fe-sec">
        <dl className="fe-tiles">{[FACTS[0], FACTS[1], ...OFFICES].map(([k, v], i) => <div key={k} className="card" data-reveal style={{ transitionDelay: `${(i % 3) * 80}ms` }}><dt>{k}</dt><dd>{v}</dd></div>)}</dl>
      </section>
      <section className="fe-sec" id="cases">
        <h2 className="fe-h" data-reveal>실제 사례</h2>
        <p className="fe-note" data-reveal>{CASE_NOTE}</p>
        <ul className="fe-cases">{CASES.slice(0, 3).map((c, i) => <li key={c.title} className="card" data-reveal style={{ transitionDelay: `${i * 80}ms` }}><Phone c={c} /><CaseCopy c={c} /></li>)}</ul>
      </section>
      <section className="fe-sec" id="types">
        <h2 className="fe-h" data-reveal>빚이 있어도 이런 추심은 불법입니다</h2>
        <ul className="mosaic">{TYPES.map(([t, d], i) => (
          <li key={t} className={i === 0 ? 'big' : ''} data-reveal style={{ transitionDelay: `${i * 70}ms` }}>
            <img src={TYPE_IMG[i][0]} alt={TYPE_IMG[i][1]} loading="lazy" width={1600} height={1067} />
            <div><span>{no(i)}</span><b>{t}</b><p>{d}</p></div>
          </li>
        ))}</ul>
      </section>
    </div>

    <section className="pband" id="record">
      <img src="/img/record.webp" alt="노트에 통화 기록을 적는 손" loading="lazy" width={1600} height={1067} />
      <div className="wrap band-narrow">
        <h2 className="title" data-reveal>오늘 바로 남겨 둘 기록 <em>4가지</em></h2>
        <ol className="records light two reveal-group">{RECORDS.map(([t, d]) => <li key={t}><b>{t}</b><p>{d}</p></li>)}</ol>
      </div>
    </section>

    <div className="wrap fe-body">
      <section className="fe-sec fe-faq" id="faq">
        <div><h2 className="fe-h" data-reveal>자주 묻는 질문</h2><figure className="photo small" data-reveal><img src="/img/desk2.webp" alt="어두운 책상 위 노트" loading="lazy" width={960} height={720} /></figure></div>
        <Faq cls="dark" />
      </section>
    </div>

    <section className="pband closing-p">
      <img src="/img/road.webp" alt="밤의 도로" loading="lazy" width={960} height={640} />
      <div className="wrap closing-in" data-reveal>
        <h2>혼자 고민하지 마세요.<br />통화 기록만 있어도 상담을 시작할 수 있습니다.</h2>
        <p className="closing-tel"><a href={tel}>{CONTACT.phone}</a></p>
        <Cta center light />
      </div>
    </section>
  </>
);
