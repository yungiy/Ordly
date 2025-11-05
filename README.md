# Ordly

Ordly는 고객이 테이블에서 직접 주문할 수 있는 스마트 오더 서비스입니다. 이 프로젝트는 레스토랑 관리자를 위한 어드민 페이지와 고객을 위한 컨슈머 페이지로 구성되어 있습니다.

## ✨ 주요 기능

### 🧑‍💻 Admin 애플리케이션 (ordly-admin)
- **메뉴 관리**: 메뉴 항목 추가, 수정, 삭제 및 카테고리 관리.
- **주문 관리**: 실시간 주문 현황 확인, 주문 접수, 처리, 완료 상태 업데이트.
- **테이블 관리**: 테이블 배치 설정 및 상태 관리.
- **매출 통계**: 기간별 매출 및 인기 메뉴 통계 확인 (예정).
- **사용자 관리**: 직원 계정 관리 (예정).

### 📱 Consumer 애플리케이션 (ordly-consumer)
- **QR 코드 스캔 주문**: 테이블의 QR 코드를 스캔하여 바로 주문 페이지 접속.
- **직관적인 메뉴 탐색**: 카테고리별 메뉴 탐색 및 상세 정보 확인.
- **간편한 주문**: 장바구니에 담기, 수량 조절, 주문 요청.
- **실시간 주문 상태 확인**: 주문 접수부터 완료까지의 상태를 실시간으로 확인.
- **결제 연동**: 다양한 결제 수단 연동 (예정).

## 🚀 프로젝트 구조

이 저장소는 두 개의 개별 Next.js 애플리케이션으로 구성된 모노레포 형식입니다.

- **/ordly-admin**: 레스토랑 소유자 또는 관리자가 메뉴, 주문, 테이블 등을 관리하기 위한 어드민 대시보드입니다.
- **/ordly-consumer**: 고객이 메뉴를 보고 주문하는 데 사용하는 클라이언트 애플리케이션입니다.

## 🛠️ 기술 스택

- **프레임워크**: Next.js@15
- **언어**: TypeScript
- **스타일링**: Tailwind CSS@v4
- **상태 관리**:Zustand
- **데이터베이스**: Supabase
- **ORM**: Prisma
- **배포**: Vercel

## 🏁 시작하기

각 애플리케이션을 로컬 환경에서 실행하는 방법은 다음과 같습니다.

### 📋 전제 조건

프로젝트를 실행하기 전에 다음 도구들이 설치되어 있는지 확인하세요:
- Node.js (LTS 버전 권장)
- npm 또는 Yarn 또는 pnpm

### 1. 저장소 클론

```bash
git clone https://github.com/your-username/Ordly.git
cd Ordly
```

### 2. 의존성 설치

각 애플리케이션 디렉토리로 이동하여 의존성을 설치합니다.

```bash
cd ordly-admin
npm install # 또는 yarn install 또는 pnpm install
cd ../ordly-consumer
npm install # 또는 yarn install 또는 pnpm install
cd ..
```

### 3. 환경 변수 설정

각 애플리케이션의 `.env.local` 파일을 설정해야 합니다. `.env.example` 파일을 참조하여 생성하세요.

**`ordly-admin/.env.local` 예시:**
```
NEXT_PUBLIC_API_URL=http://localhost:3000/api
DATABASE_URL="postgresql://user:password@localhost:5432/ordly_admin_db"
```

**`ordly-consumer/.env.local` 예시:**
```
NEXT_PUBLIC_API_URL=http://localhost:3000/api
```
*(API URL은 백엔드 또는 어드민 애플리케이션의 API 엔드포인트가 될 수 있습니다. 필요에 따라 조정하세요.)*

### 4. 애플리케이션 실행

각 애플리케이션을 별도의 터미널에서 실행합니다.

#### 1. Admin 애플리케이션 실행

```bash
cd ordly-admin
npm run dev
```
Admin 애플리케이션은 `http://localhost:3000` (또는 다른 포트)에서 실행됩니다.

#### 2. Consumer 애플리케이션 실행

```bash
cd ordly-consumer
npm run dev
```
Consumer 애플리케이션은 `http://localhost:3001` (또는 다른 포트)에서 실행됩니다.

