import { createRouter, createWebHistory } from "vue-router";
import authRoutes from "./authRoutes";
import homeRoutes from "./homeRoutes";
import postRoutes from "./postRoutes";
import typeRoutes from "./typeRoutes";
import userRoutes from "./userRoutes";

// Các route khác của ứng dụng
const routes = [
  ...authRoutes,
  ...homeRoutes,
  ...postRoutes,
  ...typeRoutes,
  ...userRoutes,
  {
    path: "/",
    redirect: "/login",
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: () => import("@/pages/NotFound.vue"), // Trang 404
  },
];

// Tạo Router
const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Xử lý Route Guard (nếu cần)
router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem("authToken"); // Kiểm tra token (ví dụ)
  if (to.meta.requiresAuth && !isAuthenticated) {
    next("/login"); // Chuyển hướng đến Login nếu chưa đăng nhập
  } else {
    next(); // Cho phép truy cập
  }
});

export default router;
