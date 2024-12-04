<template>
  <div class="home-page">
    <h1>Chào mừng đến với trang chủ</h1>
    <div v-if="token">
      <p><strong>JWT Token:</strong> {{ token }}</p>
    </div>
    <div v-else>
      <p>Không có token. Bạn cần đăng nhập.</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomePage",
  data() {
    return {
      token: null, // Biến để lưu trữ token JWT
    };
  },
  created() {
    this.checkToken(); // Kiểm tra và lấy token khi component được tạo
  },
  methods: {
    // Kiểm tra token trong localStorage hoặc sessionStorage
    checkToken() {
      const token = localStorage.getItem("jwt_token"); // Hoặc sessionStorage.getItem('jwt_token')
      if (token) {
        this.token = token; // Nếu có token, lưu vào biến token
      }
    },
  },
};
</script>

<style scoped>
.home-page {
  padding: 20px;
  text-align: center;
}
</style>
