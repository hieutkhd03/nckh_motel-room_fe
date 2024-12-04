<template>
  <v-container fill-height>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="4">
        <v-card>
          <v-card-title class="headline">Đăng nhập</v-card-title>
          <v-card-text>
            <v-form @submit.prevent="handleLogin">
              <!-- Input Email -->
              <v-text-field
                v-model="email"
                label="Email"
                :rules="[emailRule]"
                required
                prepend-icon="mdi-email"
              />
              <!-- Input Password -->
              <v-text-field
                v-model="password"
                label="Mật khẩu"
                :rules="[passwordRule]"
                type="password"
                required
                prepend-icon="mdi-lock"
              />
              <!-- Submit Button -->
              <v-btn :loading="loading" type="submit" color="primary" block
                >Đăng nhập</v-btn
              >
            </v-form>
            <!-- Error Message -->
            <v-alert v-if="message" type="error" class="mt-4">{{
              message
            }}</v-alert>
          </v-card-text>
          <v-card-actions>
            <router-link to="/register">
              <v-btn text>Chưa có tài khoản? Đăng ký ngay!</v-btn>
            </router-link>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import AuthService from "@/services/AuthService";

export default {
  data() {
    return {
      email: "",
      password: "",
      loading: false,
      message: "",
      emailRule: [
        (v) => !!v || "Email không thể trống",
        (v) => /.+@.+\..+/.test(v) || "Email không hợp lệ",
      ],
      passwordRule: [
        (v) => !!v || "Mật khẩu không thể trống",
        (v) =>
          (v && v.length >= 6 && v.length <= 15) ||
          "Mật khẩu phải từ 6-15 ký tự",
      ],
    };
  },
  methods: {
    handleLogin() {
      this.loading = true;
      this.message = "";
      AuthService.login(this.email, this.password)
        .then(() => {
          const user = AuthService.getCurrentUser();
          if (user) {
            // Lưu thông tin người dùng vào localStorage
            localStorage.setItem("isLoggedIn", true);
            localStorage.setItem("username", user.username);
            localStorage.setItem("role", AuthService.getCurrentUserRole());

            // Chuyển hướng đến trang /home
            this.$router.push("/home"); // Sử dụng this.$router.push để chuyển hướng
          }
          this.loading = false;
        })
        .catch((error) => {
          this.message =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();
          this.loading = false;
        });
    },
  },
};
</script>

<style scoped>
/* Thêm các style nếu cần */
</style>
