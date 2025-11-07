import { Box } from "@chakra-ui/react";
import { useTab } from "@/hooks/useTab";
import SideBar from "@/features/MyPage/components/SideBar";
import { USER_TAB } from "@/constants/userMenu";

// ✅ 각 탭 페이지 import
import Profile from "@/features/MyPage/pages/Profile";
import Orders from "@/features/MyPage/pages/Orders";
import Reviews from "@/features/MyPage/pages/Reviews";
import Settings from "@/features/MyPage/pages/Settings";

const MyPage = () => {
  // 🔹 탭 value 목록 생성 (['profile', 'orders', 'reviews', 'settings'])
  const tabValues = USER_TAB.map((tab) => tab.value);
  const { tabIndex, handleClickTab } = useTab("mypageTab", tabValues);

  // 🔹 탭 value에 따라 컴포넌트 매핑
  const TAB_COMPONENTS = {
    profile: Profile,
    orders: Orders,
    reviews: Reviews,
    settings: Settings,
  };

  // 🔹 현재 활성화된 탭 컴포넌트 선택
  const ActiveComponent =
    TAB_COMPONENTS[tabValues[tabIndex]] ?? (() => <Box>준비 중</Box>);

  return (
    <Box as="main" display="flex" p="20px" h="100vh" bg="white" gap="20px">
      {/* 🔹 사이드바 */}
      <SideBar tabIndex={tabIndex} handleClickTab={handleClickTab} />

      {/* 🔹 오른쪽 본문 */}
      <Box flex="1" bg="gray.50" rounded="xl" boxShadow="sm" p="24px">
        <ActiveComponent />
      </Box>
    </Box>
  );
};

export default MyPage;
