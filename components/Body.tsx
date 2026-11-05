// 히어로 아래 본문 — 네 안이 뼈대부터 다르다.
// A 편집형(큰 번호 섹션, 유형 큰 글 목록, 기록 타일) / B 사례 지그재그 먼저, 아코디언 2열 / C 전부 선 격자, 사례 3×2 / D 레퍼런스형(남색 특징 띠, 폰 5대 한 줄)
import { BRAND, CONTACT, tel } from '../lib/site';
import { STEPS, RECORDS, OFFICES, FACTS, TYPES, FAQ, CASES } from '../lib/content';
import { Cta, Cases, Phone, CaseCopy, CASE_NOTE } from './Ui';

const no = (i: number) => String(i + 1).padStart(2, '0');
const faqText = (a: string) => a.replace('법률 대리는', `${BRAND}는 법률 대리를`);


// 상황별 대응 — 레퍼런스(사진 카드 4장 격자)를 그대로 쓰지 않고 1장 크게 + 3줄 목록으로. 항목마다 "법은 이렇게 본다" + "지금 할 일"
type Chk = { img: string; alt: string; t: string; law: string; todo: string };
const CHECKS_BIG: Chk = { img: '/img/despair.webp', alt: '어두운 방에 혼자 앉아 있는 사람', t: '가족·지인에게 알리겠다는 협박', law: '채무 사실을 가족·직장 등 제3자에게 알리거나 알리겠다고 압박하는 것은 채권추심법이 금지한 행위입니다.', todo: '문자·메시지를 지우지 말고 날짜가 보이게 보관' };
const CHECKS_ROWS: Chk[] = [
  { img: '/img/hero.webp', alt: '휴대폰을 쥔 손', t: '하루 수십 통의 전화와 문자', law: '반복 연락, 욕설·협박, 밤 9시~아침 8시 연락은 금지 행위입니다.', todo: '통화 목록을 날짜·시간이 보이게 캡처' },
  { img: '/img/note.webp', alt: '체크리스트를 적는 손', t: '원금보다 커지는 이자', law: '법정 최고이자율은 연 20%. 넘는 이자는 지급 의무가 없습니다.', todo: '송금 내역을 날짜순으로 정리' },
  { img: '/img/desk.webp', alt: '늦은 밤 책상 위 노트북과 휴대폰', t: '메신저 독촉과 사진 유포 위협', law: '개인정보·사진 유포 협박은 형사 처벌 대상입니다.', todo: '차단하기 전에 대화 화면부터 캡처' },
];
export const SelfCheck = () => (
  <section className="sec selfcheck" id="check">
    <div className="wrap">
      <div className="head" data-reveal><div><p className="sc-label">상황별 대응</p><h2 className="title">이런 연락을 받고 있다면<br /><em>기록부터</em> 남기세요</h2><p>상황마다 법이 어떻게 보는지, 오늘 무엇을 남겨야 하는지 적었습니다.</p></div></div>
      <div className="sc-mix">
        <figure className="sc-big" data-reveal>
          <img src={CHECKS_BIG.img} alt={CHECKS_BIG.alt} loading="lazy" width={1600} height={1067} />
          <figcaption><b>{CHECKS_BIG.t}</b><p>{CHECKS_BIG.law}</p><small>지금 할 일 — {CHECKS_BIG.todo}</small></figcaption>
        </figure>
        <ol className="sc-list reveal-group">{CHECKS_ROWS.map((c) => (
          <li key={c.t}><img src={c.img} alt={c.alt} loading="lazy" width={1600} height={1067} /><div><b>{c.t}</b><p>{c.law}</p><small>지금 할 일 — {c.todo}</small></div></li>
        ))}</ol>
      </div>
    </div>
  </section>
);

export const Band = () => (
  <section className="band">
    <div className="wrap band-in">
      <dl className="facts">{FACTS.map(([k, v], i) => <div key={k} data-reveal style={{ transitionDelay: `${i * 100}ms` }}><dt>{k}</dt><dd>{v}</dd></div>)}</dl>
      <a className="band-call" href={tel} data-reveal><small>상담 전화</small><b>{CONTACT.phone}</b><span>전화 · 카카오톡</span></a>
    </div>
  </section>
);

export const Faq = ({ cls = '' }: { cls?: string }) => <div className={`faq ${cls}`}>{FAQ.map(([q, a]) => <details key={q} data-reveal><summary>{q}<i /></summary><p>{faqText(a)}</p></details>)}</div>;

const Closing = ({ cls = '', bigTel }: { cls?: string; bigTel?: boolean }) => (
  <section className={`closing ${cls}`}>
    {cls === 'closing-c' && <img src="/img/office.webp" alt="" aria-hidden="true" loading="lazy" width={1600} height={1068} />}
    <div className="wrap closing-in" data-reveal>
      <h2>혼자 고민하지 마세요.<br />통화 기록만 있어도 상담을 시작할 수 있습니다.</h2>
      {bigTel && <p className="closing-tel"><a href={tel}>{CONTACT.phone}</a></p>}
      <Cta center light />
    </div>
  </section>
);

// ---------- A 편집형: 01~05 큰 번호 섹션. 진행 → 유형(큰 글 목록) → 사례 띠 → 기록 타일 → 숫자 띠 → FAQ 한 칸 → 큰 전화번호 마무리
export const BodyA = () => (
  <>
    <SelfCheck />
    <section className="sec" id="process">
      <div className="wrap sec-no"><span>01</span><div>
        <h2 className="title" data-reveal>기록부터 신고까지 <em>순서대로</em></h2>
        <ol className="steps reveal-group">{STEPS.map(([t, d], i) => <li key={t}><span>{no(i)}</span><b>{t}</b><p>{d}</p></li>)}</ol>
      </div></div>
    </section>
    <section className="sec soft" id="types">
      <div className="wrap sec-no"><span>02</span><div>
        <h2 className="title" data-reveal>빚이 있어도 <em>이런 추심은 불법</em>입니다</h2>
        <ol className="types-list">{TYPES.map(([t, d], i) => <li key={t} data-reveal style={{ transitionDelay: `${(i % 3) * 60}ms` }}><span>{no(i)}</span><b>{t}</b><p>{d}</p></li>)}</ol>
      </div></div>
    </section>
    <Cases />
    <section className="sec" id="record">
      <div className="wrap sec-no"><span>04</span><div>
        <h2 className="title" data-reveal>오늘 바로 남겨 둘 기록 <em>4가지</em></h2>
        <ol className="tiles reveal-group">{RECORDS.map(([t, d]) => <li key={t}><b>{t}</b><p>{d}</p></li>)}</ol>
        <dl className="offices" data-reveal>{OFFICES.map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}</dl>
      </div></div>
    </section>
    <Band />
    <section className="sec" id="faq">
      <div className="wrap sec-no"><span>05</span><div>
        <h2 className="title" data-reveal>자주 묻는 질문</h2>
        <Faq cls="one" />
      </div></div>
    </section>
    <Closing bigTel />
  </>
);

// ---------- B 사례형: 사례 지그재그(대응 전→후 한 줄씩) → 진행 세로 목록+사진 → 기록 사진 띠 → 유형·FAQ 아코디언 2열 → 숫자 띠 → 마무리
export const BodyB = () => (
  <>
    <SelfCheck />
    <section className="sec" id="cases">
      <div className="wrap">
        <div className="head" data-reveal><div><h2 className="title">실제 사례, <em>대응 전과 후</em></h2><p>{CASE_NOTE}</p></div></div>
        <ol className="zigzag">
          {CASES.slice(0, 4).map((c, i) => (
            <li key={c.title} data-reveal>
              <Phone c={c} />
              <div className="zz-copy">
                <span className="zz-no">{no(i)}</span>
                <CaseCopy c={c} />
                <dl className="zz-ba"><dt>대응 전</dt><dd>“{c.msgs[0].t}”</dd><dt>대응 후</dt><dd>“{c.msgs[c.msgs.length - 1].t}”</dd></dl>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
    <section className="sec soft" id="process">
      <div className="wrap process-b">
        <div>
          <h2 className="title" data-reveal>기록부터 신고까지<br /><em>순서대로</em> 함께합니다</h2>
          <ol className="steps-b reveal-group">{STEPS.map(([t, d], i) => <li key={t}><span>{no(i)}</span><div><b>{t}</b><p>{d}</p></div></li>)}</ol>
        </div>
        <figure className="photo" data-reveal><img src="/img/office.webp" alt="조용한 사무실 복도" loading="lazy" width={1600} height={1068} /></figure>
      </div>
    </section>
    <section className="record-b" id="record">
      <img src="/img/record.webp" alt="노트에 통화 기록을 적는 손" loading="lazy" width={1600} height={1067} />
      <div className="wrap record-b-in">
        <h2 className="title" data-reveal>오늘 바로 남겨 둘 기록 <em>4가지</em></h2>
        <ol className="records light reveal-group">{RECORDS.map(([t, d]) => <li key={t}><b>{t}</b><p>{d}</p></li>)}</ol>
        <dl className="offices light" data-reveal>{OFFICES.map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}</dl>
      </div>
    </section>
    <section className="sec" id="types">
      <div className="wrap acc-wrap">
        <div>
          <h2 className="title" data-reveal>빚이 있어도<br /><em>이런 추심은 불법</em>입니다</h2>
          <div className="faq acc">{TYPES.map(([t, d], i) => <details key={t} data-reveal><summary><span>{no(i)}</span>{t}<i /></summary><p>{d}</p></details>)}</div>
        </div>
        <div id="faq">
          <h2 className="title" data-reveal>자주 묻는 질문</h2>
          <Faq cls="acc" />
        </div>
      </div>
    </section>
    <Band />
    <Closing />
  </>
);

// ---------- C 격자형: 전부 선으로 나눈 칸. 진행 4칸 → 숫자·기관 6칸 → 사례 3×2 → 유형 3×2 → 기록(사진 우) → FAQ 2열 → 사진 마무리
export const BodyC = () => (
  <>
    <SelfCheck />
    <section className="sec" id="process">
      <div className="wrap">
        <div className="gc-head" data-reveal><h2 className="title">기록부터 신고까지 <em>순서대로</em></h2><p>첫 상담에서 신고·차단까지 네 단계로 진행합니다.</p></div>
        <ol className="gc-steps reveal-group">{STEPS.map(([t, d], i) => <li key={t}><span>{no(i)}</span><b>{t}</b><p>{d}</p></li>)}</ol>
        <dl className="stat-tiles">{[...FACTS, ...OFFICES].map(([k, v], i) => <div key={k} data-reveal style={{ transitionDelay: `${(i % 3) * 80}ms` }}><dt>{k}</dt><dd>{v}</dd></div>)}</dl>
      </div>
    </section>
    <section className="sec soft" id="cases">
      <div className="wrap">
        <div className="gc-head" data-reveal><h2 className="title">실제 사례</h2><p>{CASE_NOTE}</p></div>
        <ul className="cases-grid">{CASES.map((c, i) => <li key={c.title} data-reveal style={{ transitionDelay: `${(i % 3) * 80}ms` }}><Phone c={c} /><CaseCopy c={c} /></li>)}</ul>
      </div>
    </section>
    <section className="sec" id="types">
      <div className="wrap">
        <div className="gc-head" data-reveal><h2 className="title">빚이 있어도 <em>이런 추심은 불법</em>입니다</h2><p>채권의 공정한 추심에 관한 법률은 채무가 있어도 아래 행위를 금지합니다.</p></div>
        <ol className="gc-types">{TYPES.map(([t, d], i) => <li key={t} data-reveal style={{ transitionDelay: `${(i % 3) * 80}ms` }}><span>{no(i)}</span><b>{t}</b><p>{d}</p></li>)}</ol>
      </div>
    </section>
    <section className="sec soft" id="record">
      <div className="wrap record flip">
        <figure className="photo" data-reveal><img src="/img/record.webp" alt="노트에 통화 기록을 적는 손" loading="lazy" width={1600} height={1067} /></figure>
        <div>
          <h2 className="title" data-reveal>오늘 바로<br />남겨 둘 기록 <em>4가지</em></h2>
          <ol className="records reveal-group">{RECORDS.map(([t, d]) => <li key={t}><b>{t}</b><p>{d}</p></li>)}</ol>
        </div>
      </div>
    </section>
    <section className="sec" id="faq">
      <div className="wrap">
        <div className="gc-head" data-reveal><h2 className="title">자주 묻는 질문</h2></div>
        <Faq cls="faq-c" />
      </div>
    </section>
    <Closing cls="closing-c" />
  </>
);

// ---------- D 레퍼런스형: 흰 특징 띠(StripD, 페이지에서) → 숫자 띠 → 남색 "범죄입니다" 띠(3칸 + 전화 박스) → 폰 5대 한 줄 → 진행 4열 → 유형 3열 → 기록 → FAQ → 마무리
const D_FEATS: [string, string][] = [
  ['전화·카카오톡 상담', '통화 기록만 있어도 상담을 시작할 수 있습니다'],
  ['신고 접수 안내', '금융감독원 1332, 경찰 112 접수 순서를 함께 잡습니다'],
  ['소송·고소는 변호사 안내', `${BRAND}는 법률 대리를 하지 않습니다. 대한법률구조공단 132`],
];
export const BodyD = () => (
  <>
    <SelfCheck />
    <section className="d-band">
      <div className="wrap d-band-in">
        <div className="d-band-copy" data-reveal><b>불법추심은 범죄입니다.</b><p>기록이 있으면<br />신고할 수 있습니다.</p></div>
        <ul className="d-feats reveal-group">{D_FEATS.map(([t, d]) => <li key={t}><b>{t}</b><p>{d}</p></li>)}</ul>
        <a className="d-call" href={tel} data-reveal><small>상담 전화</small><b>{CONTACT.phone}</b><span>전화 · 카카오톡</span></a>
      </div>
    </section>
    <section className="sec" id="cases">
      <div className="wrap">
        <div className="head" data-reveal><div><h2 className="title">실제 피해 사례</h2><p>{CASE_NOTE}</p></div></div>
        <ul className="cases-row">{CASES.slice(0, 5).map((c, i) => <li key={c.title} data-reveal style={{ transitionDelay: `${i * 70}ms` }}><Phone c={c} /><CaseCopy c={c} /></li>)}</ul>
      </div>
    </section>
    <section className="sec soft" id="process">
      <div className="wrap process">
        <h2 className="title" data-reveal>기록부터 신고까지<br /><em>순서대로</em> 함께합니다</h2>
        <ol className="steps reveal-group">{STEPS.map(([t, d], i) => <li key={t}><span>{no(i)}</span><b>{t}</b><p>{d}</p></li>)}</ol>
      </div>
    </section>
    <section className="sec" id="types">
      <div className="wrap">
        <div className="head" data-reveal><div><h2 className="title">빚이 있어도 <em>이런 추심은 불법</em>입니다</h2><p>채권의 공정한 추심에 관한 법률은 채무가 있어도 아래 행위를 금지합니다.</p></div></div>
        <ol className="types">{TYPES.map(([t, d], i) => <li key={t} data-reveal style={{ transitionDelay: `${(i % 3) * 80}ms` }}><span>{no(i)}</span><b>{t}</b><p>{d}</p></li>)}</ol>
      </div>
    </section>
    <section className="sec soft" id="record">
      <div className="wrap record">
        <figure className="photo" data-reveal><img src="/img/record.webp" alt="노트에 통화 기록을 적는 손" loading="lazy" width={1600} height={1067} /></figure>
        <div>
          <h2 className="title" data-reveal>오늘 바로<br />남겨 둘 기록 <em>4가지</em></h2>
          <ol className="records reveal-group">{RECORDS.map(([t, d]) => <li key={t}><b>{t}</b><p>{d}</p></li>)}</ol>
          <dl className="offices" data-reveal>{OFFICES.map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}</dl>
        </div>
      </div>
    </section>
    <section className="sec" id="faq">
      <div className="wrap faq-wrap">
        <div><h2 className="title" data-reveal>자주 묻는 질문</h2><figure className="photo small" data-reveal><img src="/img/office.webp" alt="조용한 사무실 복도" loading="lazy" width={1600} height={1068} /></figure></div>
        <Faq />
      </div>
    </section>
    <Closing />
  </>
);
