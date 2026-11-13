// 실제 후기 게시판 — 목록·글쓰기는 components/ReviewBoard.tsx(클라이언트), 데이터는 api/app.py
import type { Metadata } from 'next';
import ReviewBoard from '../../components/ReviewBoard';
import { BRAND } from '../../lib/site';

export const metadata: Metadata = { title: `실제 후기 | ${BRAND}`, description: '불법추심 대응 상담 뒤 달라진 점을 이름을 가린 채 남기는 후기 게시판입니다. 글쓴이 이름은 앞 두 글자만 보이고 연락처는 받지 않습니다.', alternates: { canonical: '/review/' }, openGraph: { url: '/review/', title: `실제 후기 | ${BRAND}`, images: ['/og.jpg'] } };

export default function Review() {
  return (
    <main id="top" className="review">
      <section className="sec page-head">
        <div className="wrap">
          <p className="hero-label">실제 후기</p>
          <h1 className="title">상담 뒤 무엇이 달라졌는지,<br /><em>이름을 가린 채</em> 남깁니다</h1>
          <p className="page-lead">글쓴이는 앞 두 글자만 보이고 나머지는 별표로 처리됩니다. 연락처는 받지 않고, 글에 남긴 내용 외에는 아무것도 저장하지 않습니다.</p>
        </div>
      </section>
      <section className="sec soft">
        <div className="wrap"><h2 className="board-h">후기 목록</h2><ReviewBoard /></div>
      </section>
    </main>
  );
}
