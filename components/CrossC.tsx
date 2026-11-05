// 시안 C 풀블리드 교차형 — 좌우 분할 히어로(오른쪽 화면 끝까지 사진), 그 아래 사진 띠 ↔ 흰 섹션이 번갈아 내려간다
import { BRAND, CONTACT, tel } from '../lib/site';
import { STEPS, RECORDS, OFFICES, FACTS, TYPES, CASES, CHECKS } from '../lib/content';
import { Cta, Phone, CaseCopy, CASE_NOTE } from './Ui';
import { Faq } from './Body';

const no = (i: number) => String(i + 1).padStart(2, '0');

export const CrossC = () => (
  <>
    <section className="hero hero-x">
      <div className="hero-x-copy">
        <p className="hero-label">불법추심 대응 상담</p>
        <h1 className="hero-title x-title"><span><i>협박 전화, 가족 연락,</i></span><span><i>야간 방문까지</i></span><span><i>전부 <em>신고</em>할 수 있습니다</i></span></h1>
        <p className="hero-lead">갚아야 할 돈과 불법적인 독촉은 별개입니다. {BRAND}는 기록 정리부터 신고·차단까지 순서대로 함께합니다.</p>
        <Cta />
        <ul className="hero-checks">{CHECKS.map((c) => <li key={c}>{c}</li>)}</ul>
      </div>
      <figure className="hero-x-photo"><img src="/img/sea.webp" alt="창가에 앉아 밖을 보는 사람" width={1024} height={683} /></figure>
    </section>

    <section className="pband" id="record">
      <img src="/img/note.webp" alt="체크리스트를 적는 손" loading="lazy" width={1600} height={1067} />
      <div className="wrap band-narrow">
        <h2 className="title" data-reveal>오늘 바로 남겨 둘 기록 <em>4가지</em></h2>
        <ol className="records light two reveal-group">{RECORDS.map(([t, d]) => <li key={t}><b>{t}</b><p>{d}</p></li>)}</ol>
        <dl className="offices light" data-reveal>{OFFICES.map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}</dl>
      </div>
    </section>

    <section className="sec" id="process">
      <div className="wrap x-process">
        <div>
          <h2 className="title" data-reveal>기록부터 신고까지<br /><em>순서대로</em> 함께합니다</h2>
          <ol className="steps-b reveal-group">{STEPS.map(([t, d], i) => <li key={t}><span>{no(i)}</span><div><b>{t}</b><p>{d}</p></div></li>)}</ol>
        </div>
        <div className="x-phones" data-reveal><Phone c={CASES[0]} /><Phone c={CASES[5]} /></div>
      </div>
    </section>

    <section className="pband nums-band">
      <img src="/img/city.webp" alt="밤의 건물 창문들" loading="lazy" width={960} height={640} />
      <div className="wrap bignums-in light">{FACTS.map(([k, v], i) => <div key={k} className="bignum" data-reveal style={{ transitionDelay: `${i * 120}ms` }}><b>{v}</b><span>{k}</span></div>)}</div>
    </section>

    <section className="sec" id="cases">
      <div className="wrap">
        <div className="head" data-reveal><div><h2 className="title">실제 사례, <em>대응 전과 후</em></h2><p>{CASE_NOTE}</p></div></div>
        <ul className="cases-grid">{CASES.map((c, i) => <li key={c.title} data-reveal style={{ transitionDelay: `${(i % 3) * 80}ms` }}><Phone c={c} /><CaseCopy c={c} /></li>)}</ul>
      </div>
    </section>

    <section className="pband" id="types">
      <img src="/img/office2.webp" alt="빈 사무실" loading="lazy" width={1600} height={1068} />
      <div className="wrap">
        <h2 className="title" data-reveal>빚이 있어도 <em>이런 추심은 불법</em>입니다</h2>
        <ol className="fe-types x-types">{TYPES.map(([t, d], i) => <li key={t} data-reveal style={{ transitionDelay: `${(i % 2) * 80}ms` }}><span>{no(i)}</span><div><b>{t}</b><p>{d}</p></div></li>)}</ol>
      </div>
    </section>

    <section className="sec soft" id="faq">
      <div className="wrap faq-wrap">
        <div><h2 className="title" data-reveal>자주 묻는 질문</h2><figure className="photo small" data-reveal><img src="/img/desk2.webp" alt="어두운 책상 위 노트" loading="lazy" width={960} height={720} /></figure></div>
        <Faq />
      </div>
    </section>

    <section className="pband closing-p">
      <img src="/img/suit.webp" alt="정장 차림의 상담자" loading="lazy" width={1600} height={1067} />
      <div className="wrap closing-in" data-reveal>
        <h2>혼자 고민하지 마세요.<br />통화 기록만 있어도 상담을 시작할 수 있습니다.</h2>
        <p className="closing-tel"><a href={tel}>{CONTACT.phone}</a></p>
        <Cta center light />
      </div>
    </section>
  </>
);
