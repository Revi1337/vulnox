# Project Roadmap & Progress

## ✅ Phase 1: Foundation (Completed)
- [x] Next.js 15 + Tailwind CSS v4 초기화
- [x] `DESIGN.md` 기반 글로벌 디자인 시스템 (CSS Variables, Typography) 구축
- [x] 기본 레이아웃 (Navbar, Footer, Container) 구현

## ✅ Phase 2: Data Pipeline Engine (Completed)
- [x] NVD API 2.0 연동 기초 스크립트 작성
- [x] `fetch-pulse.mjs`: 최근 24시간 취약점 전수 수집 기능 구현 (페이지네이션 적용)
- [x] `analyze-trends.mjs`: 최근 30일 데이터 전수 통계 분석 기능 구현 (페이지네이션 적용)
- [x] `fetch-kev.mjs`: CISA KEV 기반 전예 데이터 수집 기능 구현

## ✅ Phase 3: Dashboard & Intelligence (Completed)
- [x] `/catalog` -> **Live Threat Pulse** 대시보드로 전면 개편
- [x] Severity Distribution 시각화 및 Hot Tech TOP 8 랭킹 구현
- [x] 실시간 피드 UI (Pulse Feed) 구현 및 2시간 주기 자동 업데이트 적용

## ✅ Phase 4: Curated Gallery (Completed)
- [x] `/all-star`: CISA KEV 기반 프리미엄 갤러리 구현
- [x] 고급 필터링 시스템 (기술별, 위험도별) 및 검색 기능 최적화

## ✅ Phase 5: Design & UX Polish (Completed)
- [x] 메인 페이지 (`/`) n8n 스타일로 전면 개편 및 가치 제안 문구 최적화
- [x] 상세 페이지(`vulnerability/[id]`) UI 개선 및 POC 연동
- [x] `.mask-fade-x` 등 테마 대응 유틸리티 클래스 적용 및 스크롤 경험 개선
- [x] **New:** 헤더 내 화살표형 페이지네이션(`< >`) 시스템 도입
- [x] **New:** 심각도별 동적 호버 글로우(Severity Hover Glow) 효과 적용

## ✅ Phase 6: Advanced Interactivity (Completed)
- [x] **Hot Tech Deep-Dive:** 기술 타겟 클릭 시 30일 전수 트렌드 데이터 즉시 로드 기능 구현
- [x] `trends.json` 아키텍처 도입을 통한 대용량 원본 데이터 탐색 최적화
- [x] **Header UX Optimization:** 헤더 레이아웃 통합 및 고정 높이 설정을 통한 레이아웃 시프트 해결
- [x] **Minimalist Design:** 헤더의 테두리 및 배경을 제거하여 테마와의 일체감 강화
- [x] **Data Architecture Cleanup:** 레거시 `vulnerabilities.json` 및 관련 스크립트 삭제를 통한 구조 최적화
- [x] 테마 전환 시스템(Light/Dark) 수정 및 기본 다크 모드 고정

## ✅ Phase 7: Hall of Fame & Data Consolidation (Completed)
- [x] **Data Integration:** CISA 공식 JSON 피드와 NVD 데이터를 통합한 `vulnerabilities_kev.json` 구축
- [x] **All-Star Highlighting:** KEV 갤러리에 랜섬웨어 사용 여부 및 CVSS 배지 등 메타데이터 강화
- [x] **Hall of Fame:** 연도별 TOP 10 취약점 리더보드 페이지 (`/leaderboard`) 구현
- [x] **Homepage Rich Content:** 메인 페이지에 리더보드 소개 및 랭킹 카드 섹션 추가

## ✅ Phase 8: System Optimization & UI Parity (Completed)
- [x] **Workflow Reorganization:** Pulse(2시간)와 KEV(일일) 워크플로우 분리를 통한 효율성 극대화
- [x] **UI Synchronization:** 리더보드와 갤러리 간의 정보 표기 방식(심각도 배지, CVSS 점수) 통일
- [x] **Minimalist Formatting:** 전체 서비스 날짜 형식을 연도 제외 `M.D` 형태로 간결화
- [x] **Project Cleanup:** 사용되지 않는 더미 파일(`leaderboard.json`) 및 레거시 주석 정리

## 🚀 Future Roadmap (Next Steps)
- [ ] **Data Quality:** CPE/CWE 매핑 로직 정교화 (엣지 케이스 처리)
- [ ] **UX Detail:** 대시보드 데이터 로딩 상태 애니메이션(Skeleton UI) 강화
- [ ] **Analytics:** 주간/월간 위협 리포트 자동 생성 브리핑 섹션 추가
- [ ] **Automation:** GitHub Actions 배포 실패 시 알림 시스템 구축

---
*Last Updated: 2026-05-10*
