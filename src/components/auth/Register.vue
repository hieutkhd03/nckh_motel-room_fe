<template>
  <v-container fill-height>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="4">
        <v-card>
          <v-card-title class="headline">Đăng ký tài khoản</v-card-title>
          <v-card-text>
            <v-form @submit.prevent="handleRegister">
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
              <!-- Input Full Name -->
              <v-text-field
                v-model="fullName"
                label="Họ tên"
                :rules="[fullNameRule]"
                required
              />
              <!-- Input Address -->
              <v-text-field
                v-model="address"
                label="Địa chỉ"
                :rules="[addressRule]"
                required
              />
              <!-- Input Phone -->
              <v-text-field
                v-model="phone"
                label="Số điện thoại"
                :rules="[phoneRule]"
                required
              />
              <!-- Submit Button -->
              <v-btn :loading="loading" type="submit" color="primary" block>
                Đăng ký
              </v-btn>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <router-link to="/login">
              <v-btn text>Đã có tài khoản? Đăng nhập ngay!</v-btn>
            </router-link>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <!-- Alert Dialog -->
    <v-dialog v-model="alert.show" persistent max-width="500">
      <v-card>
        <v-card-title class="headline text-center">
          {{ alert.title }}
        </v-card-title>
        <v-card-text>
          <p class="text-center">{{ alert.message }}</p>
        </v-card-text>
        <v-card-actions class="justify-center">
          <v-btn color="primary" text @click="closeAlert">Đóng</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import AuthService from "@/services/AuthService";

export default {
  data() {
    return {
      email: "",
      password: "",
      fullName: "",
      address: "",
      phone: "",
      loading: false,
      alert: {
        show: false,
        title: "",
        message: "",
      },
      // Quy tắc nhập liệu
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
      fullNameRule: [(v) => !!v || "Họ tên không thể trống"],
      addressRule: [(v) => !!v || "Địa chỉ không thể trống"],
      phoneRule: [
        (v) => !!v || "Số điện thoại không thể trống",
        (v) => /^[0-9]{10,11}$/.test(v) || "Số điện thoại không hợp lệ",
      ],
    };
  },
  methods: {
    handleRegister() {
      this.loading = true;

      AuthService.register(
        this.email,
        this.password,
        this.fullName,
        this.address,
        this.phone
      )
        .then(() => {
          // Đăng ký thành công
          this.showAlert(
            "Thành công",
            "Đăng ký thành công! Bạn sẽ được chuyển hướng tới trang Đăng nhập"
          );
          this.clearForm();

          // Chuyển hướng sau 1,5 giấy
          setTimeout(() => {
            this.$router.push("/login");
          }, 1500);
        })
        .catch(() => {
          // Đăng ký thất bại
          this.showAlert("Thất bại", "Đăng ký thất bại. Vui lòng thử lại!");
        })
        .finally(() => {
          this.loading = false;
        });
    },
    showAlert(title, message) {
      this.alert.title = title;
      this.alert.message = message;
      this.alert.show = true;
    },
    closeAlert() {
      this.alert.show = false;
    },
    clearForm() {
      this.email = "";
      this.password = "";
      this.fullName = "";
      this.address = "";
      this.phone = "";
    },
  },
};
</script>

<style scoped>
.v-container {
  min-height: 100vh; /* Đảm bảo căn giữa theo chiều dọc */
  background-color: #f5f5f5;
}
</style>
