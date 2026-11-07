# JC솔루션 — 불법추심 대응 상담 사이트 (디자인 초안 2026-11-02)

## 상태
- 메인 1쪽 초안. SEO 페이지(지역·키워드)는 나중에 `programmatic-seo` 방식으로 붙인다.
- 초안이라 `robots: noindex` (app/layout.tsx). 도메인·사업자 정보 받으면 index 로 바꾸고 site-launch 게이트 전부 넣는다.
- 로컬: `npx next build` 후 `cd out && python -I -m http.server 18960 --bind 127.0.0.1`. node_modules 는 curtain_prj 로 junction.

## 받아야 할 것 (lib/site.ts TODO)
- [ ] 상호 확정 (지금 "JC솔루션" 임시)
- [ ] 대표 전화, 카카오톡 채널 주소
- [ ] 사업자 정보: 대표자, 사업자등록번호, 주소, 이메일
- [ ] 도메인

## 레퍼런스
- logsolution1.imweb.me / logsolution.imweb.me (불법추심대응센터): 섹션 순서(히어로 → 불법추심 유형 → 이런 상황 → 진행 방식 → 상담 띠 → 사례 → 푸터)와 전화·카카오 이중 상담만 빌림
- 레퍼런스의 "중단율 %", "완전 해결 보장", "100% 비밀 보장", 누적 건수는 근거가 없어 쓰지 않는다. 실제 수치·후기를 받으면 넣는다

## 사실 근거 (본문에 쓴 것)
- 채권의 공정한 추심에 관한 법률 제9조: 폭행·협박, 야간(오후 9시~다음 날 오전 8시) 방문·연락, 반복 연락, 제3자에게 채무 사실 알림 등 금지
- 법정 최고이자율 연 20% (2021-07-07부터)
- 금융감독원 1332, 경찰 112, 대한법률구조공단 132
- 비변호사는 법률 대리 불가(변호사법) → "법률 대리를 하지 않는다"를 푸터·FAQ에 명시, "해결 보장" 류 문구 금지

## 디자인 시안 A/B/C/D/E (v12 2026-11-05) — 왼쪽 아래 탭으로 전환. 사용자 기준: 이미지 많이·임팩트·깔끔, 글만 있는 섹션 금지
- A 타이포 다크 `/` (HeroA + BodyA): 남색+손 사진 히어로, 흐르는 띠, 편집형 본문(큰 번호 섹션, 상황별 대응 1장 크게+3줄)
- B 포토 스토리형 `/b/` (`StoryB.tsx`): 전체 폭 사진(두 손·휴대폰) 히어로+폰 → **장면 4개**(사진 반 + 문장 + 폰 화면, 좌우 번갈아: 협박=창가 실루엣 / 기록=노트 / 신고=서명 / 중단=바다) → 사진 띠 위 숫자 3개 → 사례 띠 → 유형 **사진 모자이크(1큰+5작은)** → 기록(사진) → FAQ(사진) → 사진 띠 마무리(큰 전화번호). 바닥 고정 CTA, 플로팅 숨김
- C 풀블리드 교차형 `/c/` (`CrossC.tsx`): 좌우 분할 히어로(오른쪽 끝까지 창가 사진) → 사진 띠(노트: 기록 4가지 흰 글) → 흰(진행 세로 목록 + 폰 2대) → 사진 띠(도시: 숫자) → 흰(사례 3×2) → 사진 띠(사무실: 유형 2열) → FAQ+사진 → 사진 띠 마무리(정장). 모바일은 사진이 제목 위
- D 사진형 `/d/`: 레퍼런스 logsolution 구조
- E 다크 앱형 `/e/` (`AppE.tsx`): 상황 선택기(CSS만). 사진: 히어로 배경(밤 건물, 옅게), 진행 4카드 머리 사진(첫 카드 크게), 유형 사진 모자이크, 기록·마무리 사진 띠, FAQ 옆 작은 사진. **모바일에서 선택기는 제목 아래**(조작 요소는 위로 올리지 않음 — 사용자 지적 2026-11-05)
- 공통 CSS: `.pband`(사진 띠: 사진 밝기 .38 + 흰 글), `.bignums-in`, `.cta-bar`, `.mosaic`
- 사진 16장(`public/img/CREDITS.txt` — Unsplash 11, Openverse CC0 5: rawpixel·stocksnap). 그라데이션은 사진 덮개 4곳으로 제한(린트 상한)
- 로컬 미리보기: `scratchpad/serve.py`(Cache-Control: no-store) 포트 18961
- **배포(2026-11-05)**: 저장소 `https://github.com/Jeongdonghwan/js_prj.git` (main=소스, deploy=빌드 결과). `bash scripts/deploy.sh http://172.237.20.244:8111` → 서버 `/var/www/jcsolution`, nginx 미리보기 포트 **8111**(noindex, robots Disallow). 푸시는 HTTP/1.1 강제(`http.version`, HTTP/2에서 끊김). 서버 갱신: `cd /var/www/jcsolution && git fetch -q origin deploy && git reset -q --hard origin/deploy`
- 채택 뒤: 나머지 시안 파일(`StoryB/CrossC/AppE/Heroes/Body` 중 안 쓰는 것, `app/{b,c,d,e}`)·`Variants` 탭·안 쓰는 CSS·사진 삭제
- 인트로(components/Splash.tsx): 남색 막, 로고 → JC SOLUTION → 갈라짐 2.7초, 탭당 1번

## 확정 (2026-11-07, 사용자 결정) — 시안 A, B~E 삭제
- 브랜드 표기: 헤더 로고 옆 **한국금융범죄대응센터 / Korea Financial Crime Response Center** (`lib/site.ts` BRAND·BRAND_EN). 사업자 상호는 제이씨(JC)
- 사업자 정보(사업자등록증명 2026-11-04): 제이씨(JC) · 390-07-03777 · 경기도 김포시 하성면 귀전로 212. **대표자 이름은 싣지 않는다**(사용자 결정). 이메일·전화·카카오 채널은 아직 TODO
- 히어로 아래 띠: 아이콘(동그란 선) + 라벨 + 큰 숫자. 지금은 법 기준 3개(`lib/content.ts` RESULTS). 레퍼런스의 누적 상담·중단율·해결 사례·만족도 같은 실적 숫자는 **실제 집계를 받은 뒤** RESULTS 에 추가 — 근거 없는 숫자는 넣지 않는다
- "실제 사례" → **"실제 후기"**. 홈의 폰 화면 띠는 예시로 두고, 후기 게시판 `/review/` 로 연결
- 후기 게시판: `api/app.py` (Flask+SQLite, 127.0.0.1:8112, nginx 가 `/api/` 프록시). 이름은 앞 두 글자 + `****` 로 저장(원래 이름 저장 안 함), 연락처 안 받음, 링크 금지, IP 당 60초 1건, 함정 칸. 관리 `/api/admin` (Basic Auth admin/1234 — 서비스 파일 Environment 에서 바꾼다). 검사: `cd api && python test_app.py`
- 서버 설치(1회): `/var/www/jcsolution_api` 에 api/ 복사 → venv → `jcreview.service` → nginx 8111 블록에 `location /api/ { proxy_pass http://127.0.0.1:8112; proxy_set_header X-Forwarded-For $remote_addr; }`
