// Import tất cả các component từ thư mục home/components
import HomePage from "@/components/home/HomePage.vue";
import Criteria from "@/components/home/components/Criteria.vue";
import SearchBar from "@/components/home/components/SearchBar.vue";
import SearchResult from "@/components/home/components/SearchResult.vue";

export default [
  {
    path: "/home",
    name: "HomePage",
    component: HomePage,
    meta: {
      requiresAuth: false, // Không yêu cầu đăng nhập
    },
  },
  {
    path: "/criteria",
    name: "Criteria",
    component: Criteria,
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: "/search",
    name: "SearchBar",
    component: SearchBar,
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: "/search-result",
    name: "SearchResult",
    component: SearchResult,
    meta: {
      requiresAuth: false,
    },
  },
];
