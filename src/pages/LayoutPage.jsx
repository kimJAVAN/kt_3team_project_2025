// pages/LayoutPage.jsx
// 공통 페이지 라우팅
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';

const LayoutPage = () => {
  return (
    <div>
      <Header />
      <Outlet />
      {/* TODO 공통 푸터 */}
    </div>
  );
};

export default LayoutPage;
