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
              <v-btn :loading="loading" type="submit" color="primary" block
                >Đăng ký</v-btn
              >
            </v-form>
            <!-- Error Message -->
            <v-alert v-if="error" type="error" class="mt-4">{{
              error
            }}</v-alert>
          </v-card-text>
          <v-card-actions>
            <router-link to="/login">
              <v-btn text>Đã có tài khoản? Đăng nhập ngay!</v-btn>
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
      fullName: "",
      address: "",
      phone: "",
      error: null,
      loading: false,
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
      this.error = null; // reset error
      AuthService.register(
        this.email,
        this.password,
        this.fullName,
        this.address,
        this.phone
      )
        .then(() => {
          // Đăng ký thành công, chuyển hướng đến trang login
          this.$router.push("/login");
        })
        .catch(() => {
          this.error = "Đăng ký thất bại. Vui lòng kiểm tra lại thông tin!";
          this.loading = false;
        });
    },
  },
};
</script>

<style scoped>
.error {
  color: red;
}
</style>
