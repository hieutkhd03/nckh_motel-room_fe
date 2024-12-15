// Import các component cần thiết
import Login from "@/components/auth/Login.vue";
import Logout from "@/components/auth/Logout.vue";
import Register from "@/components/auth/Register.vue";
import Verify from "@/components/auth/Verify.vue";
import ForgotPassword from "@/components/auth/ForgotPassword.vue";

export default [
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: {
      requiresAuth: false, // Không yêu cầu đăng nhập
    },
  },
  {
    path: "/logout",
    name: "Logout",
    component: Logout,
    meta: {
      requiresAuth: true, // Chỉ dành cho người dùng đã đăng nhập
    },
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: "/verify",
    name: "Verify",
    component: Verify,
    meta: {
      requiresAuth: false, // Không yêu cầu đăng nhập
    },
  },
  {
    path: "/forgot-password",
    name: "ForgotPassword",
    component: ForgotPassword,
    meta: {
      requiresAuth: false, // Không yêu cầu đăng nhập
    },
  },
];
