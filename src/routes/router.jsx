// routes/router.jsx
import { createBrowserRouter } from "react-router-dom";
import { LayoutPage, MainPage, AdminPage } from "@/pages";

const router = createBrowserRouter([
  {
    path: "/kt_3team_project_2025",
    children: [
      {
        path: "",
        element: <LayoutPage />,
        children: [
          {
            path: "", // ~~/kt_3team_project_2025/
            element: <MainPage />,
          },
        ],
      },
      {
        path: "admin",
        element: <AdminPage />,
      },
    ],
  },
]);

export default router;
