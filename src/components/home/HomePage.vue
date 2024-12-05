<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="8">
        <v-card>
          <v-card-title>
            <h1 v-if="isAuthenticated">Chào mừng, {{ fullName }}</h1>
          </v-card-title>
          <v-card-text>
            <div v-if="token">
              <p><strong>JWT Token:</strong> {{ token }}</p>
            </div>
            <div v-else>
              <p>Vui lòng đăng nhập để tiếp tục.</p>
            </div>
          </v-card-text>
          <v-card-actions v-if="isAuthenticated">
            <v-btn color="error" block @click="logout"> Đăng xuất </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import AuthService from "@/services/AuthService";

export default {
  name: "HomePage",
  data() {
    return {
      token: null,
      fullName: "",
      isAuthenticated: false,
    };
  },
  created() {
    this.checkAuthentication();
  },
  methods: {
    checkAuthentication() {
      const user = AuthService.getCurrentUser(); // Lấy thông tin từ AuthService
      if (user && user.token) {
        this.token = user.token;
        this.fullName = user.fullName || "Người dùng"; // Giá trị dự phòng nếu không có fullName
        this.isAuthenticated = true;
      } else {
        this.isAuthenticated = false;
        console.warn("Không tìm thấy token hoặc người dùng chưa đăng nhập.");
      }
    },
    logout() {
      AuthService.logout(); // Xóa thông tin người dùng khỏi localStorage
      this.$router.push("/login"); // Chuyển hướng về trang đăng nhập
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
