src/
┣ assets/ # 정적 자원 (이미지, 폰트, 아이콘 등)
┣ components/ # 공통 UI 컴포넌트 (Header, Footer 등)
┣ features/ # 페이지 단위 컴포넌트
┃ ┣ Main/ # 메인 페이지
┃ ┃ ┣ components/ # 메인 페이지 UI 컴포넌트
┃ ┃ ┣ hooks/ # 메인 페이지 커스텀 훅
┃ ┃ ┣ api.js # 메인 페이지 API
┃ ┃ ┗ index.jsx # 실제 메인 페이지
┃ ┗ Login/ # 로그인 페이지
┣ pages/ # 페이지 단위 컴포넌트 (라우트 기준)
┣ routes/ # 라우팅 관리
┣ hooks/ # 공통 커스텀 훅
┣ utils/ # 유틸 함수 (포맷터, 헬퍼 등)
┣ stores/ # 상태 관리 (Zustand 등)
┗ constants/ # 상수 (경로, 색상, 폰트 등)
