<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import * as AuthService from "@/services/AuthService";
import Verify from "./Verify.vue";

const email = ref("");
const password = ref("");
const fullName = ref("");
const address = ref("");
const phone = ref("");
const showPassword = ref(false);
const loading = ref(false);
const generalError = ref("");
const errors = ref({});
const showVerifyPopup = ref(false);
const showSuccessAlert = ref(false);

const router = useRouter();

const validateInput = () => {
  errors.value = {};
  if (!email.value) {
    errors.value.email = "Email không được để trống.";
  } else if (!/^\S+@\S+\.\S+$/.test(email.value)) {
    errors.value.email = "Email không đúng định dạng.";
  }

  if (!password.value) {
    errors.value.password = "Mật khẩu không được để trống.";
  } else if (password.value.length < 6 || password.value.length > 15) {
    errors.value.password = "Mật khẩu phải từ 6-15 ký tự.";
  }

  if (!fullName.value) {
    errors.value.fullName = "Họ tên không được để trống.";
  }

  if (!address.value) {
    errors.value.address = "Địa chỉ không được để trống.";
  }

  if (!phone.value) {
    errors.value.phone = "Số điện thoại không được để trống.";
  } else if (!/^[0-9]{10,11}$/.test(phone.value)) {
    errors.value.phone = "Số điện thoại không hợp lệ.";
  }

  return Object.keys(errors.value).length === 0;
};

const handleRegister = async () => {
  loading.value = true;
  generalError.value = "";

  if (!validateInput()) {
    loading.value = false;
    return;
  }

  try {
    await AuthService.register(
      email.value,
      password.value,
      fullName.value,
      address.value,
      phone.value
    );

    // Hiển thị popup xác thực
    showVerifyPopup.value = true;
  } catch (error) {
    generalError.value = error?.message;
  } finally {
    loading.value = false;
  }
};

// Đóng popup xác thực và hiển thị thông báo "Xác thực thành công"
const handleVerified = () => {
  showVerifyPopup.value = false;
  showSuccessAlert.value = true;

  // Timeout chuyển hướng sau 1.5 giây
  setTimeout(() => {
    router.push("/login");
  }, 1500);
};

// Xóa lỗi khi nhập lại
const clearError = (field) => {
  if (errors.value[field]) {
    delete errors.value[field];
  }
  generalError.value = "";
};
</script>

<template>
  <v-container class="fill-height d-flex align-center justify-center">
    <!-- Success Alert -->
    <v-card
      v-if="showSuccessAlert"
      class="success-alert-card"
      elevation="2"
      outlined
    >
      <v-card-title class="success-alert-title">
        <div class="success-alert-icon">
          <v-icon color="green">mdi-check-circle</v-icon>
        </div>
        Xác thực thành công!
      </v-card-title>
    </v-card>

    <!-- Registration Form -->
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
        </v-card>
      </v-col>
    </v-row>

    <!-- Verify Popup -->
    <v-dialog v-model="showVerifyPopup" persistent max-width="500px">
      <div class="verify-popup">
        <Verify :email="email" @verified="handleVerified" />
      </div>
    </v-dialog>
  </v-container>
</template>

<style scoped>
.v-btn {
  width: 100%;
  padding: 12px 0;
}

.header-title {
  margin-bottom: 24px;
  font-size: 24px;
  font-weight: bold;
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

.verify-popup {
  max-width: 600px;
  width: 100%;
  padding: 16px;
  background: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}

.success-alert-card {
  width: 85%;
  max-width: 800px;
  height: 280px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000;
  background-color: #f0f8ff;
  border-radius: 10px;
}

.success-alert-title {
  font-size: 50px;
  font-weight: bold;
  color: green;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
</style>
