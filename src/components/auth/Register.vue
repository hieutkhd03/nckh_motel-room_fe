<template>
  <v-container class="fill-height d-flex align-center justify-center">
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="6">
        <v-card elevation="1" class="p-4 card-padding">
          <h2 class="text-center header-title">ĐĂNG KÝ TÀI KHOẢN</h2>

          <v-form @submit.prevent="handleRegister">
            <!-- Input Email -->
            <div class="field-label">Email</div>
            <v-text-field
              v-model="email"
              outlined
              :error-messages="errors.email"
              class="mb-4"
              required
              @input="clearError('email')"
            />

            <!-- Input Password -->
            <div class="field-label">Mật khẩu</div>
            <v-text-field
              v-model="password"
              :type="showPassword ? 'text' : 'password'"
              outlined
              :error-messages="errors.password"
              class="mb-4"
              required
              @input="clearError('password')"
            />

            <!-- Input Full Name -->
            <div class="field-label">Họ tên</div>
            <v-text-field
              v-model="fullName"
              outlined
              :error-messages="errors.fullName"
              class="mb-4"
              required
              @input="clearError('fullName')"
            />

            <!-- Input Address -->
            <div class="field-label">Địa chỉ</div>
            <v-text-field
              v-model="address"
              outlined
              :error-messages="errors.address"
              class="mb-4"
              required
              @input="clearError('address')"
            />

            <!-- Input Phone -->
            <div class="field-label">Số điện thoại</div>
            <v-text-field
              v-model="phone"
              outlined
              :error-messages="errors.phone"
              class="mb-4"
              required
              @input="clearError('phone')"
            />

            <!-- Trường ẩn: Hiển thị lỗi khi có lỗi chung -->
            <div v-if="generalError" class="error-message mb-4">
              {{ generalError }}
            </div>

            <!-- Nút Đăng ký -->
            <v-btn
              :loading="loading"
              type="submit"
              color="primary"
              block
              class="btn-padding"
            >
              Đăng ký
            </v-btn>
          </v-form>

          <!-- Đường dẫn Đăng nhập -->
          <div class="text-center mt-4">
            <router-link to="/login" class="register-link">
              Đã có tài khoản? Đăng nhập ngay!
            </router-link>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import * as AuthService from "@/services/AuthService";

export default {
  data() {
    return {
      email: "",
      password: "",
      fullName: "",
      address: "",
      phone: "",
      showPassword: false,
      loading: false,
      generalError: "",
      errors: {},
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
        this.errors.password = "Mật khẩu phải từ 6-15 ký tự.";
      }

      // Validate full name
      if (!this.fullName) {
        this.errors.fullName = "Họ tên không được để trống.";
      }

      // Validate address
      if (!this.address) {
        this.errors.address = "Địa chỉ không được để trống.";
      }

      // Validate phone
      if (!this.phone) {
        this.errors.phone = "Số điện thoại không được để trống.";
      } else if (!/^[0-9]{10,11}$/.test(this.phone)) {
        this.errors.phone = "Số điện thoại không hợp lệ.";
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

    async handleRegister() {
      this.loading = true;
      this.generalError = "";

      // Validate input
      if (!this.validateInput()) {
        this.loading = false;
        return;
      }

      try {
        await AuthService.register(
          this.email,
          this.password,
          this.fullName,
          this.address,
          this.phone
        );

        // Đăng ký thành công
        this.$router.push("/login");
      } catch (error) {
        // Hiển thị lỗi từ backend
        this.generalError =
          error?.message || "Đăng ký thất bại. Vui lòng thử lại!";
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped>
.header-title {
  margin-bottom: 24px;
  font-size: 24px;
  font-weight: bold;
}

.field-padding {
  margin-bottom: 16px;
}

.card-padding {
  padding: 30px;
}

.fill-height {
  height: 100vh;
}

.mb-4 {
  margin-bottom: 16px;
}

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
