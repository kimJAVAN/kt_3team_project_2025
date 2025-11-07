// routes/router.jsx
import { createBrowserRouter } from "react-router-dom";
import { LayoutPage, MainPage, AdminPage, LoginPage, PayPage, PaySuccessPage, PayFailPage, CartPage, SignupPage, WishListPage, MyPage } from "@/pages";

const router = createBrowserRouter([
  {
    path: "/kt_3team_project_2025",
    children: [
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "signup",
        element: <SignupPage />,
      },
      {
        path: "",
        element: <LayoutPage />,
        children: [
          {
            path: "", // ~~/kt_3team_project_2025/
            element: <MainPage />,
          },
          {
            path: "pay",
            children: [
              { index: true, element: <PayPage /> },
              { path: "success", element: <PaySuccessPage /> },
              { path: "fail", element: <PayFailPage /> },
            ],
          },
          {
            path: "cart",
            element: <CartPage />
          },
          {
            path: "mypage",
            element: <MyPage />
          }
        ],
      },
      {
        path : 'member',
        element: <LayoutPage />,
        children : [
          { path: "wishlist", element: <WishListPage /> },
        ]
      },
      {
        path: "admin",
        element: <AdminPage />,
      },
    ],
  },
]);

export default router;