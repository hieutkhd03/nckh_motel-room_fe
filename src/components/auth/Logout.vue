<template>
  <v-container fill-height>
    <v-row justify="center" align="center">
      <v-col cols="12" md="6">
        <v-card>
          <v-card-title>
            <h3>Đang đăng xuất...</h3>
          </v-card-title>
          <v-card-text>
            <v-progress-linear
              indeterminate
              color="primary"
            ></v-progress-linear>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import AuthService from "@/services/AuthService";

export default {
  name: "Logout",
  created() {
    this.handleLogout();
  },
  methods: {
    handleLogout() {
      AuthService.logout(); // Xóa thông tin người dùng khỏi localStorage
      this.$router.push("/login"); // Chuyển hướng về trang đăng nhập
    },
  },
};
</script>

<style scoped>
.logout-page {
  padding: 20px;
  text-align: center;
}
</style>
