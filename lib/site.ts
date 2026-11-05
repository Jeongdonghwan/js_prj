// 사이트 설정 — 상호·사업자 정보·연락처는 사용자에게 받으면 채운다 (TODO 표시 부분)
export const SITE_URL = process.env.SITE_URL || 'https://example.com'; // TODO 도메인
export const BRAND = 'JC솔루션'; // TODO 상호 확정
export const BRAND_EN = 'JC SOLUTION';
export const SERVICE = '불법추심 대응 상담';

export const CONTACT = {
  phone: '0000-0000', // TODO 대표 전화
  kakao: '#', // TODO 카카오톡 채널 주소
};

export const BUSINESS = {
  // TODO 사업자 정보 — 받기 전까지 푸터에 "준비 중"
  name: '',
  owner: '',
  bizNumber: '',
  address: '',
  email: '',
};

export const tel = `tel:${CONTACT.phone.replace(/[^0-9]/g, '')}`;
