// Import các component từ thư mục type
import MotelRoom from "@/components/type/MotelRoom.vue";
import SharedRoom from "@/components/type/SharedRoom.vue";

export default [
  {
    path: "/type/motel",
    name: "MotelRoom",
    component: MotelRoom,
    meta: {
      requiresAuth: false, // Không yêu cầu đăng nhập để xem
    },
  },
  {
    path: "/type/shared",
    name: "SharedRoom",
    component: SharedRoom,
    meta: {
      requiresAuth: false, // Không yêu cầu đăng nhập để xem
    },
  },
];
