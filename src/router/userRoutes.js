// Import các component từ thư mục user
import ChangePassword from "@/components/user/ChangePassword.vue";
import EditProfile from "@/components/user/EditProfile.vue";
import Notification from "@/components/user/Notification.vue";
import PostHistory from "@/components/user/PostHistory.vue";
import Profile from "@/components/user/Profile.vue";
import Recharge from "@/components/user/Recharge.vue";
import RechargeHistory from "@/components/user/RechargeHistory.vue";

export default [
  {
    path: "/user/profile",
    name: "Profile",
    component: Profile,
    meta: {
      requiresAuth: true, // Yêu cầu đăng nhập
    },
  },
  {
    path: "/user/profile/edit",
    name: "EditProfile",
    component: EditProfile,
    meta: {
      requiresAuth: true, // Yêu cầu đăng nhập
    },
  },
  {
    path: "/user/change-password",
    name: "ChangePassword",
    component: ChangePassword,
    meta: {
      requiresAuth: true, // Yêu cầu đăng nhập
    },
  },
  {
    path: "/user/notifications",
    name: "Notification",
    component: Notification,
    meta: {
      requiresAuth: true, // Yêu cầu đăng nhập
    },
  },
  {
    path: "/user/post-history",
    name: "PostHistory",
    component: PostHistory,
    meta: {
      requiresAuth: true, // Yêu cầu đăng nhập
    },
  },
  {
    path: "/user/recharge",
    name: "Recharge",
    component: Recharge,
    meta: {
      requiresAuth: true, // Yêu cầu đăng nhập
    },
  },
  {
    path: "/user/recharge-history",
    name: "RechargeHistory",
    component: RechargeHistory,
    meta: {
      requiresAuth: true, // Yêu cầu đăng nhập
    },
  },
];
