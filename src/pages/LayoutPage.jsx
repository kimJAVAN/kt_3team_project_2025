// pages/LayoutPage.jsx
// 공통 페이지 라우팅
import { Outlet } from "react-router-dom";

const LayoutPage = () => {
  return (
    <div>
      {/* TODO 공통 헤더 */}
      <Outlet />
      {/* TODO 공통 푸터 */}
    </div>
  );
};

export default LayoutPage;
