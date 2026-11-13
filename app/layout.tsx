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
  alternates: { canonical: '/' },
  openGraph: { type: 'website', siteName: BRAND, locale: 'ko_KR', url: '/', images: [{ url: '/og.jpg', width: 1200, height: 630, alt: `${BRAND} ${SERVICE}` }] },
  twitter: { card: 'summary_large_image', images: ['/og.jpg'] },
  icons: { icon: [{ url: '/favicon.ico', sizes: 'any' }, { url: '/icon.png', type: 'image/png', sizes: '192x192' }], apple: '/apple-touch-icon.png' },
};

export const viewport: Viewport = { themeColor: '#1f2a44', width: 'device-width', initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const biz = [['상호', BUSINESS.name], ['사업자등록번호', BUSINESS.bizNumber], ['주소', BUSINESS.address], ['이메일', BUSINESS.email]].filter(([, v]) => v);
  return (
    <html lang="ko">
      <head>
        <script dangerouslySetInnerHTML={{ __html: introScript }} />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css" />      </head>
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ '@context': 'https://schema.org', '@type': 'Organization', name: BRAND, alternateName: BRAND_EN, url: SITE_URL, logo: `${SITE_URL}/icon.png`, contactPoint: { '@type': 'ContactPoint', telephone: CONTACT.phone, contactType: 'customer service', areaServed: 'KR', availableLanguage: 'Korean' } }) }} />
        <Splash />
        <header className="site-header">
          <div className="wrap header-inner">
            <Link href="/" className="logo"><img src="/logo-ink.png" alt={`${BRAND} 로고`} width={769} height={593} /><span className="logo-name"><b>{BRAND}</b><small>{BRAND_EN}</small></span></Link>
            <nav className="nav">
              <a href="#process">진행 방식</a>
              <a href="/review/">실제 후기</a>
              <a href="#types">불법추심 유형</a>
              <a href="#faq">자주 묻는 질문</a>
              <a href={tel} className="nav-call" aria-label="전화 상담"><IcPhone />전화 상담</a>
            </nav>
          </div>
        </header>
        {children}
        <footer className="site-footer">
          <div className="wrap foot-in">
            <img src="/logo-light.png" alt={BRAND_EN} width={769} height={593} className="foot-logo" />
            <dl className="foot-biz">{biz.map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}</dl>
            <p className="foot-note">{BRAND}는 법률 대리를 하지 않습니다. 소송·형사 고소가 필요한 경우 변호사·법률구조공단 상담을 함께 안내합니다. 홈의 대화 화면은 예시이며, 실제 후기는 후기 게시판에 이름을 가린 채 게시됩니다.</p>
            <p className="foot-copy">© {new Date().getFullYear()} {BRAND} · {BRAND_EN}</p>
          </div>
        </footer>
        <Floating />
        <Motion />
      </body>
    </html>
  );
}
