<script setup>
import { ref } from "vue";
import * as AuthService from "@/services/AuthService";
import PopupNewPassword from "./PopupNewPassword.vue";
import { useRouter } from "vue-router";
import Verify from "./Verify.vue";

const email = ref("");
const loading = ref(false);
const generalError = ref("");
const errors = ref({});
const showVerifyPopup = ref(false);
const showNewPasswordPopup = ref(false);
const showSuccessAlert = ref(false);

const otpValue = ref("");

const router = useRouter();

// Validate Email
const validateInput = () => {
  errors.value = {};
  if (!email.value) {
    errors.value.email = "Email không được để trống.";
  } else if (!/^\S+@\S+\.\S+$/.test(email.value)) {
    errors.value.email = "Email không đúng định dạng.";
  }
  return Object.keys(errors.value).length === 0;
};

//Nhập Email
const handleSubmitEmail = async () => {
  loading.value = true;
  generalError.value = "";

  if (!validateInput()) {
    loading.value = false;
    return;
  }

  try {
    //Gửi lại OTP
    await AuthService.regenerateOTP(email.value);
    showVerifyPopup.value = true;
  } catch (error) {
    generalError.value = error?.message || "Không tìm thấy email.";
  } finally {
    loading.value = false;
  }
};

//Xác thực
const handleOtpVerified = (otp) => {
  otpValue.value = otp;
  showVerifyPopup.value = false;
  showNewPasswordPopup.value = true;
};

//Nhập MK mới
const handlePasswordChanged = () => {
  showNewPasswordPopup.value = false;
  showSuccessAlert.value = true;

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
  <!-- Container -->
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
        Đổi mật khẩu thành công!
      </v-card-title>
    </v-card>

    <v-row justify="center">
      <v-col cols="12" sm="8" md="6">
        <v-card class="p-4 card-padding" elevation="2">
          <!-- Title -->
          <h2 class="text-center header-title">Quên mật khẩu</h2>
          <p class="text-center mb-4">
            Vui lòng nhập email để tìm kiếm tài khoản của bạn.
          </p>

          <!-- Input Email -->
          <v-form @submit.prevent="handleSubmitEmail">
            <v-text-field
              v-model="email"
              outlined
              label="Email"
              :error-messages="errors.email"
              required
              variant="solo-filled"
              @input="clearError('email')"
            />

            <!-- Error Message -->
            <div v-if="generalError" class="error-message mb-4">
              {{ generalError }}
            </div>

            <!-- Nút Xác nhận -->
            <v-btn
              :loading="loading"
              type="submit"
              color="primary"
              block
              class="btn-padding"
            >
              Xác nhận
            </v-btn>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>

  <!-- Popup Nhập OTP -->
  <v-dialog v-model="showVerifyPopup" persistent max-width="500px">
    <div class="popup">
      <Verify :email="email" @verified="handleOtpVerified" />
    </div>
  </v-dialog>

  <!-- Popup Nhập mật khẩu mới -->
  <v-dialog v-model="showNewPasswordPopup" persistent max-width="500px">
    <div class="popup">
      <PopupNewPassword
        :email="email"
        :otp="otpValue"
        @password-changed="handlePasswordChanged"
      />
    </div>
  </v-dialog>
</template>

<style scoped>
.header-title {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 16px;
}

.card-padding {
  padding: 30px;
}

.error-message {
  color: red;
  text-align: center;
  font-weight: bold;
}

.btn-padding {
  margin-top: 16px;
}

.popup {
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
