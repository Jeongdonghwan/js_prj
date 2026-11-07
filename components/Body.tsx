// 히어로 아래 본문 — 편집형(큰 번호 섹션, 유형 큰 글 목록, 기록 타일)
import { BRAND, CONTACT, tel } from '../lib/site';
import { STEPS, RECORDS, OFFICES, FACTS, TYPES, FAQ } from '../lib/content';
import { Cta, Cases, IcPhone } from './Ui';

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
      <a className="band-call" href={tel} data-reveal><small>상담 전화</small><b>{CONTACT.phone || <IcPhone />}</b><span>전화 · 카카오톡</span></a>
    </div>
  </section>
);

export const Faq = ({ cls = '' }: { cls?: string }) => <div className={`faq ${cls}`}>{FAQ.map(([q, a]) => <details key={q} data-reveal><summary>{q}<i /></summary><p>{faqText(a)}</p></details>)}</div>;

const Closing = ({ cls = '', bigTel }: { cls?: string; bigTel?: boolean }) => (
  <section className={`closing ${cls}`}>
    <div className="wrap closing-in" data-reveal>
      <h2>혼자 고민하지 마세요.<br />통화 기록만 있어도 상담을 시작할 수 있습니다.</h2>
      {bigTel && CONTACT.phone && <p className="closing-tel"><a href={tel}>{CONTACT.phone}</a></p>}
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
