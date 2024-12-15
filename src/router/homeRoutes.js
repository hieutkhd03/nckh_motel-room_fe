import HomePage from "@/components/home/HomePage.vue";
import Criteria from "@/components/home/components/Criteria.vue";
import SearchBar from "@/components/home/components/SearchBar.vue";
import SearchResult from "@/components/home/components/SearchResult.vue";
import HomeLayout from "@/layouts/HomeLayout.vue";
import About from "@/pages/About.vue";

export default [
  {
    path: "/home",
    name: "HomeLayout",
    component: HomeLayout,
    meta: {
      requiresAuth: false,
    },
    children: [
      {
        path: "/home",
        name: "Home",
        component: HomePage,
      },
      {
        path: "/about",
        name: "About",
        component: About,
      },
    ],
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
