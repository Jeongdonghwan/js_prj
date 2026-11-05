import type { Metadata, Viewport } from 'next';
import Link from 'next/link';
import './globals.css';
import Motion from '../components/Motion';
import Splash, { introScript } from '../components/Splash';
import { Floating, IcPhone } from '../components/Ui';
import { SITE_URL, BRAND, BRAND_EN, SERVICE, CONTACT, BUSINESS, tel } from '../lib/site';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: `${BRAND} | ${SERVICE} — 불법 사채·불법추심 피해 기록과 신고 안내`, template: '%s' },
  description: '폭언·협박, 야간 연락, 가족·지인 연락 같은 불법추심 피해를 상담합니다. 통화·문자 기록 정리부터 신고 절차까지 순서대로 안내합니다.',
  robots: { index: false, follow: false }, // 초안 — 도메인·사업자 정보 받은 뒤 index 로
  alternates: { canonical: '/' },
  icons: { icon: [{ url: '/favicon.ico', sizes: 'any' }, { url: '/icon.png', type: 'image/png', sizes: '192x192' }], apple: '/apple-touch-icon.png' },
};

export const viewport: Viewport = { themeColor: '#1f2a44', width: 'device-width', initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const biz = [['상호', BUSINESS.name], ['대표', BUSINESS.owner], ['사업자등록번호', BUSINESS.bizNumber], ['주소', BUSINESS.address], ['이메일', BUSINESS.email]];
  return (
    <html lang="ko">
      <head>
        <script dangerouslySetInnerHTML={{ __html: introScript }} />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css" />      </head>
      <body>
        <Splash />
        <header className="site-header">
          <div className="wrap header-inner">
            <Link href="/" className="logo"><img src="/logo-ink.png" alt={`${BRAND_EN} ${BRAND}`} width={769} height={593} /></Link>
            <nav className="nav">
              <a href="#process">진행 방식</a>
              <a href="#cases">실제 사례</a>
              <a href="#types">불법추심 유형</a>
              <a href="#faq">자주 묻는 질문</a>
              <a href={tel} className="nav-call"><IcPhone />{CONTACT.phone}</a>
            </nav>
          </div>
        </header>
        {children}
        <footer className="site-footer">
          <div className="wrap foot-in">
            <img src="/logo-light.png" alt={BRAND_EN} width={769} height={593} className="foot-logo" />
            <dl className="foot-biz">{biz.map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v || '준비 중'}</dd></div>)}</dl>
            <p className="foot-note">{BRAND}는 법률 대리를 하지 않습니다. 소송·형사 고소가 필요한 경우 변호사·법률구조공단 상담을 함께 안내합니다. 사례 화면은 예시이며 실제 사례는 당사자 동의 뒤 게시합니다.</p>
            <p className="foot-copy">© {new Date().getFullYear()} {BRAND_EN}</p>
          </div>
        </footer>
        <Floating />
        <Motion />
      </body>
    </html>
  );
}
