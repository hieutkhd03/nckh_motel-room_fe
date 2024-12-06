<template>
  <v-container class="fill-height d-flex align-center justify-center">
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="6">
        <v-card elevation="1" class="p-4 card-padding">
          <h2 class="text-center header-title">ĐĂNG NHẬP</h2>
          <v-form @submit.prevent="handleLogin">
            <!-- Email -->
            <div class="field-label">Email</div>
            <v-text-field
              v-model="email"
              outlined
              :error-messages="errors.email"
              class="mb-4"
              required
              @input="clearError('email')"
            />

            <!-- Mật khẩu -->
            <div class="field-label">Mật khẩu</div>
            <v-text-field
              v-model="password"
              :type="showPassword ? 'text' : 'password'"
              outlined
              :error-messages="errors.password"
              append-inner-icon="mdi-eye"
              @click:append-inner="togglePasswordVisibility"
              class="mb-4"
              required
              @input="clearError('password')"
            />
            <!-- Trường ẩn: Hiển thị lỗi khi có lỗi -->
            <div v-if="generalError" class="error-message mb-4">
              {{ generalError }}
            </div>

            <!-- Nút Đăng nhập -->
            <v-btn
              :loading="loading"
              type="submit"
              color="primary"
              block
              class="btn-padding"
            >
              Đăng nhập
            </v-btn>
          </v-form>
          <!-- Đường dẫn Đăng ký -->
          <div class="text-center mt-4">
            <router-link to="/register" class="register-link">
              Chưa có tài khoản? Đăng ký ngay!
            </router-link>
          </div>
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
      showPassword: false,
      loading: false,
      errors: {},
      generalError: "",
    };
  },
  methods: {
    validateInput() {
      // Reset lỗi
      this.errors = {};

      // Validate email
      if (!this.email) {
        this.errors.email = "Email không được để trống.";
      } else if (!/^\S+@\S+\.\S+$/.test(this.email)) {
        this.errors.email = "Email không đúng định dạng.";
      }

      // Validate password
      if (!this.password) {
        this.errors.password = "Mật khẩu không được để trống.";
      } else if (this.password.length < 6 || this.password.length > 15) {
        this.errors.password = "Mật khẩu phải từ 6-15 kí tự.";
      }

      // Trả về true nếu không có lỗi
      return Object.keys(this.errors).length === 0;
    },

    clearError(field) {
      // Xóa lỗi của trường cụ thể khi người dùng nhập lại
      if (this.errors[field]) {
        this.errors[field] = "";
      }
    },

    async handleLogin() {
      this.loading = true;
      this.generalError = ""; // Reset lỗi trước khi xử lý

      // Thực hiện validate trước khi gửi yêu cầu
      if (!this.validateInput()) {
        this.loading = false;
        return;
      }

      try {
        // Gọi AuthService để đăng nhập
        const user = await AuthService.login(this.email, this.password);

        if (user && user.token) {
          this.$router.push("/home");
        }
      } catch (error) {
        // Hiển thị lỗi từ backend
        this.generalError =
          error?.message || "Sai thông tin tài khoản hoặc mật khẩu!";
      } finally {
        this.loading = false;
      }
    },
    togglePasswordVisibility() {
      this.showPassword = !this.showPassword;
    },
  },
};
</script>

<style scoped>
/* Đảm bảo text-field và nút mật khẩu trông thống nhất */
.header-title {
  margin-bottom: 24px;
  font-size: 24px;
  font-weight: bold;
}

.field-padding {
  margin-bottom: 16px;
}

.field-label {
  margin-bottom: 8px;
  font-weight: 500;
  font-size: 16px;
  color: #4a4a4a;
}

.v-input {
  position: relative;
}

.v-input .v-input__control {
  padding-right: 40px;
}

.v-input .v-input__append-inner {
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
}

.v-input .v-input__append-inner:hover {
  color: #007bff;
}

/* Căn chỉnh container */
.fill-height {
  height: 100vh;
}

/* Padding cho toàn bộ card */
.card-padding {
  padding: 30px;
}

/* Tăng khoảng cách giữa các phần */
.mb-4 {
  margin-bottom: 16px;
}

/* Link đăng ký */
.register-link {
  color: #007bff;
  text-decoration: none;
}

.register-link:hover {
  text-decoration: underline;
}

.error-message {
  color: red;
  font-weight: bold;
  text-align: center;
}
</style>
