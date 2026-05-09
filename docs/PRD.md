# VULNOX - Product Requirements Document (PRD)

## 1. 프로젝트 개요 (Project Overview)
VULNOX는 최신 보안 취약점(CVE) 정보를 실시간으로 시각화하고, 역사적으로 중요한 취약점들을 큐레이션하여 제공하는 프리미엄 보안 대시보드입니다. 사용자가 복잡한 보안 데이터를 직관적으로 이해하고 탐색할 수 있도록 고도의 UX 디자인을 적용합니다.

## 2. 디자인 철학 (Design Philosophy)
*   **Premium Dark Aesthetics:** 깊이 있는 다크 모드를 기본으로 하며, Glassmorphism과 미세한 Glow 효과를 통해 현대적이고 고급스러운 인터페이스를 제공합니다.
*   **Geomanist Typography:** 300(Light) 웨이트를 활용한 극도로 정제된 타이포그래피를 지향합니다.
*   **Minimalist Data Formatting:** 정보 과부하를 줄이기 위해 날짜 형식을 간결한 `M.D` (예: 4.29) 형태로 표준화합니다.

## 3. 핵심 기능 (Core Features)

### 🚀 Live Threat Pulse (Dashboard)
*   **Today's Pulse Feed:** 지난 24시간 내에 발행된 모든 CVE 데이터를 실시간으로 수집하여 제공합니다.
*   **Trend Activity Exploration:** 'Hot Tech Targets'를 클릭하면 최근 30일간의 해당 기술에 대한 모든 취약점 내역(전수 데이터)을 즉시 조회할 수 있습니다.
*   **Interactive UX:** 
    *   **Arrow Pagination:** 헤더 내 `< >` 버튼을 통한 직관적인 페이지 이동 지원.
    *   **Severity Hover Glow:** 취약점의 심각도(Critical, High 등)에 따라 고유한 색상으로 반응하는 동적 호버 효과.
*   **2-Hour Auto Update:** GitHub Actions를 통해 2시간마다 데이터를 최신 상태로 유지합니다.

### 🌟 All-Star Vulnerability Gallery
*   **Curated Excellence:** 미국 CISA KEV 카탈로그를 기반으로, 실제 공격에 악용된 검증된 취약점들만 모아 제공합니다.
*   **Official Insights:** 랜섬웨어 사용 여부, CVSS 점수 배지 등 전문적인 보안 메타데이터를 제공합니다.

### 🏆 Hall of Fame (Leaderboard)
*   **Annual Rankings:** 2010년부터 현재까지, 매년 보안 생태계에 가장 큰 파장을 일으켰던 TOP 10 취약점을 엄선하여 제공합니다.
*   **Influence Scoring Algorithm:** 단순 CVSS 점수를 넘어 실질적 위협도를 평가하는 가중치 시스템을 적용합니다.
    *   **Severity (50%):** CVSS 3.x/2.0 Base Score.
    *   **Real-world Impact (30%):** CISA KEV 카탈로그 포함 여부 (실제 악용 증거).
    *   **Technical Interest (20%):** 공개된 POC 및 기술 분석 리포트의 풍부함.
    *   **Historical Significance:** 업계에서 상징성을 가진 '명명된' 취약점(예: Log4Shell) 우선 순위 부여.
*   **Premium Visuals:** 
    *   1위~3위에 대한 골드/실버/브론즈 메달 배지 및 카드 강조.
    *   연도별 타임라인 내비게이션을 통한 역사적 탐색 기능.
*   **Homepage Showcase:** 메인 페이지에서 리더보드의 핵심 통찰력을 시각적으로 요약하여 보여줍니다.

### 🔍 Technical Detail View
*   **Standardized Mapping:** NVD의 CPE/CWE 데이터를 파싱하여 영향을 받는 기술군과 위협 유형을 자동으로 분류하여 보여줍니다.
*   **POC Integration:** 취약점 재현 및 분석을 위한 Proof of Concept 외부 링크를 통합하여 제공합니다.

## 4. 기술 스택 (Tech Stack)
*   **Framework:** Next.js (App Router, TypeScript)
*   **Styling:** Tailwind CSS v4
*   **Data Pipeline:** Dual GitHub Actions Workflow
    *   **Pulse Workflow:** 2시간 주기 (Live 데이터 전용)
    *   **KEV Workflow:** 매일 자정 (역사적 데이터 전용)
*   **Deployment:** Static Export 기반 서버리스 아키텍처

## 5. 데이터 아키텍처 (Data Architecture)
*   `data/pulse.json`: 최근 24시간 전수 데이터.
*   `data/analytics.json`: 최근 30일 통계 분석 데이터.
*   `data/trends.json`: 최근 30일간의 모든 취약점 원본 데이터.
*   `data/vulnerabilities_kev.json`: CISA 공식 피드와 NVD 데이터를 통합한 핵심 취약점 데이터 (All-Star & Leaderboard 공용).


