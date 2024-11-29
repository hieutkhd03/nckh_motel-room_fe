import { createRouter, createWebHistory } from "vue-router";
import authRoutes from "./authRoutes"; // Import authRoutes
import homeRoutes from "./homeRoutes"; // Import homeRoutes
import postRoutes from "./postRoutes"; // Import postRoutes
import typeRoutes from "./typeRoutes"; // Import typeRoutes
import userRoutes from "./userRoutes"; // Import userRoutes

// Các route khác của ứng dụng
const routes = [
  ...authRoutes, // Các route cho auth module
  ...homeRoutes, // Các route cho home module
  ...postRoutes, // Các route cho post module
  ...typeRoutes, // Các route cho type module
  ...userRoutes, // Các route cho user module
  {
    path: "/",
    redirect: "/login", // Redirect mặc định đến Login
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
