// 시안 B 포토 스토리형 — 전체 폭 사진 히어로 + 폰, 장면마다 사진·폰·한 문장(좌우 번갈아), 사진 띠 위 숫자, 사례 띠, 유형 사진 모자이크, 기록, FAQ, 사진 마무리. 바닥 고정 CTA
import { CONTACT, tel } from '../lib/site';
import { STEPS, RECORDS, OFFICES, FACTS, TYPES, CASES, CHECKS } from '../lib/content';
import { Cta, Cases, Phone, IcTalk, IcPhone } from './Ui';
import { Faq } from './Body';

const no = (i: number) => String(i + 1).padStart(2, '0');
const c0 = CASES[0], c5 = CASES[5];

const RecordScreen = () => (
  <div className="phone hero-phone">
    <p className="ph-from">기록 정리</p>
    <ul className="ph-rec">{RECORDS.map(([t, d]) => <li key={t}><b>{t}</b><span>{d}</span></li>)}</ul>
  </div>
);

// 장면 4개 — 사진 / 문장 / 폰 화면
const SCENES = [
  { img: '/img/window.webp', alt: '창가에 서 있는 사람의 실루엣', k: '협박', t: '밤 11시, 회사로 찾아오겠다는 문자가 옵니다.', d: '야간 연락과 직장 방문 협박은 채권추심법이 금지한 행위입니다. 지우지 말고 그대로 두세요.', screen: <Phone c={{ ...c0, msgs: c0.msgs.slice(0, 2) }} hero /> },
  { img: '/img/note.webp', alt: '체크리스트를 적는 손', k: '기록', t: '통화·문자·송금을 날짜순으로 묶습니다.', d: '첫 상담에서 어떤 기록이 있는지 같이 확인하고, 빠진 것은 오늘 바로 남깁니다.', screen: <RecordScreen /> },
  { img: '/img/sign.webp', alt: '서류에 서명하는 손', k: '신고', t: '금융감독원 1332와 경찰에 순서대로 접수합니다.', d: '접수번호를 받아 두고, 이후 연락은 받지 말고 바로 알려 주시면 됩니다.', screen: <Phone c={c5} hero /> },
  { img: '/img/sea.webp', alt: '창가에 앉아 바다를 보는 사람', k: '중단', t: '대응 다음 날, 연락이 끊겼습니다.', d: '대응 뒤 달라진 반응입니다. 화면은 예시이며 실제 사례는 당사자 동의 뒤 게시합니다.', screen: <Phone c={{ ...c0, msgs: c0.msgs.slice(2) }} hero /> },
];

// 유형 모자이크 — 1장 크게 + 5장 작게
const TYPE_IMG = ['/img/despair.webp', '/img/hands.webp', '/img/bills.webp', '/img/desk.webp', '/img/road.webp', '/img/office2.webp'];
const TYPE_ALT = ['어두운 방에 혼자 앉아 있는 사람', '휴대폰을 쥔 두 손', '서류와 계산기', '늦은 밤 책상 위 노트북과 휴대폰', '밤의 도로', '빈 사무실'];

export const StoryB = () => (
  <>
    <section className="hero pband hero-pb">
      <img src="/img/hands.webp" alt="휴대폰을 쥔 두 손" width={1600} height={1067} />
      <div className="wrap hero-pb-in">
        <div>
          <p className="hero-label">불법추심 대응 상담</p>
          <h1 className="hero-title pb-title"><span><i>빚이 있어도</i></span><span><i>불법추심은 <em>신고</em>할 수 있습니다</i></span></h1>
          <p className="hero-lead">협박 문자 한 장부터 신고 접수까지, 화면으로 보여 드립니다.</p>
          <Cta light />
          <ul className="hero-checks big pb-checks">{CHECKS.map((c) => <li key={c}>{c}</li>)}</ul>
        </div>
        <div className="pb-phone"><Phone c={c0} hero /><p className="hero-demo-cap"><b>{c0.result}</b>{c0.who} · 화면 예시</p></div>
      </div>
    </section>

    <section className="scenes" id="process">
      {SCENES.map((s, i) => (
        <div key={s.k} className="scene">
          <figure className="scene-photo" data-reveal><img src={s.img} alt={s.alt} loading="lazy" width={1600} height={1067} /><figcaption>{no(i)} · {s.k}</figcaption></figure>
          <div className="scene-copy">
            <div data-reveal><span className="scene-no">{no(i)} · {s.k}</span><h2>{s.t}</h2><p>{s.d}</p></div>
            <div className="scene-phone" data-reveal>{s.screen}</div>
          </div>
        </div>
      ))}
    </section>

    <section className="pband nums-band">
      <img src="/img/city.webp" alt="밤의 건물 창문들" loading="lazy" width={960} height={640} />
      <div className="wrap bignums-in light">{FACTS.map(([k, v], i) => <div key={k} className="bignum" data-reveal style={{ transitionDelay: `${i * 120}ms` }}><b>{v}</b><span>{k}</span></div>)}</div>
    </section>

    <Cases />

    <section className="sec" id="types">
      <div className="wrap">
        <div className="head" data-reveal><div><h2 className="title">빚이 있어도 <em>이런 추심은 불법</em>입니다</h2><p>채권의 공정한 추심에 관한 법률은 채무가 있어도 아래 행위를 금지합니다.</p></div></div>
        <ul className="mosaic">{TYPES.map(([t, d], i) => (
          <li key={t} className={i === 0 ? 'big' : ''} data-reveal style={{ transitionDelay: `${i * 70}ms` }}>
            <img src={TYPE_IMG[i]} alt={TYPE_ALT[i]} loading="lazy" width={1600} height={1067} />
            <div><span>{no(i)}</span><b>{t}</b><p>{d}</p></div>
          </li>
        ))}</ul>
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
        <div><h2 className="title" data-reveal>자주 묻는 질문</h2><figure className="photo small" data-reveal><img src="/img/desk2.webp" alt="어두운 책상 위 노트" loading="lazy" width={960} height={720} /></figure></div>
        <Faq />
      </div>
    </section>

    <section className="pband closing-p">
      <img src="/img/road.webp" alt="밤의 도로" loading="lazy" width={960} height={640} />
      <div className="wrap closing-in" data-reveal>
        <h2>혼자 고민하지 마세요.<br />통화 기록만 있어도 상담을 시작할 수 있습니다.</h2>
        <p className="closing-tel"><a href={tel}>{CONTACT.phone}</a></p>
        <Cta center light />
      </div>
    </section>

    <div className="cta-bar">
      <a className="kakao" href={CONTACT.kakao}><IcTalk />카카오톡 상담</a>
      <a className="call" href={tel}><IcPhone />전화 상담 {CONTACT.phone}</a>
    </div>
  </>
);
