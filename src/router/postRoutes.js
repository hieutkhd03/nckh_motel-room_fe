// Import các component từ thư mục post
import CreatePost from "@/components/post/CreatePost.vue";
import DetailPost from "@/components/post/DetailPost.vue";
import EditPost from "@/components/post/EditPost.vue";

export default [
  {
    path: "/post/create",
    name: "CreatePost",
    component: CreatePost,
    meta: {
      requiresAuth: true, // Yêu cầu đăng nhập để tạo bài viết
    },
  },
  {
    path: "/post/:id",
    name: "DetailPost",
    component: DetailPost,
    meta: {
      requiresAuth: false, // Không cần đăng nhập để xem chi tiết bài viết
    },
    props: true, // Truyền ID bài viết qua route params
  },
  {
    path: "/post/:id/edit",
    name: "EditPost",
    component: EditPost,
    meta: {
      requiresAuth: true, // Yêu cầu đăng nhập để chỉnh sửa bài viết
    },
    props: true, // Truyền ID bài viết qua route params
  },
];
