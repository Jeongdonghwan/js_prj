// 사이트 설정 — 연락처는 사용자에게 받으면 채운다 (TODO 표시 부분)
export const SITE_URL = process.env.SITE_URL || 'https://example.com'; // TODO 도메인
export const BRAND = '한국금융범죄대응센터'; // 센터 이름(헤더·본문). 사업자 상호는 BUSINESS.name
export const BRAND_EN = 'Korea Financial Crime Response Center';
export const SERVICE = '불법추심 대응 상담';

export const CONTACT = {
  phone: '0000-0000', // TODO 대표 전화
  kakao: '#', // TODO 카카오톡 채널 주소
};

// 사업자등록증명(2026-11-04 발급) 기준. 대표자 이름은 사용자 결정으로 싣지 않는다
export const BUSINESS = {
  name: '제이씨(JC)',
  bizNumber: '390-07-03777',
  address: '경기도 김포시 하성면 귀전로 212',
  email: '', // TODO 받으면 채움 — 비어 있으면 푸터에서 빠진다
};

export const tel = `tel:${CONTACT.phone.replace(/[^0-9]/g, '')}`;
