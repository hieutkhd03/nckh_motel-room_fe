<script setup>
import { ref } from "vue";
import * as AuthService from "@/services/AuthService";

const props = defineProps({
  email: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
    required: true,
  },
});

const emit = defineEmits(["password-changed"]);

const newPassword = ref("");
const loading = ref(false);
const errors = ref({});
const generalError = ref("");

// Validate Input
const validateInput = () => {
  errors.value = {};
  if (!newPassword.value) {
    errors.value.newPassword = "Mật khẩu không được để trống.";
  } else if (newPassword.value.length < 6 || newPassword.value.length > 15) {
    errors.value.newPassword = "Mật khẩu phải từ 6-15 ký tự.";
  }

  return Object.keys(errors.value).length === 0;
};

// Đổi mật khẩu
const handleChangePassword = async () => {
  if (!validateInput()) return;

  loading.value = true;

  try {
    await AuthService.forgotPassword(props.email, newPassword.value, props.otp);
    emit("password-changed");
  } catch (error) {
    errors.value.general = error?.message || "Đổi mật khẩu thất bại!";
  } finally {
    loading.value = false;
  }
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
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="8">
        <h2 class="text-center mb-4">Nhập mật khẩu mới</h2>

        <v-form @submit.prevent="handleChangePassword">
          <!-- New Password -->
          <v-text-field
            v-model="newPassword"
            type="password"
            label="Mật khẩu mới"
            outlined
            :error-messages="errors.newPassword"
            required
            variant="solo-filled"
            @input="clearError('newPassword')"
          />

          <!-- Error Message -->
          <div v-if="generalError" class="error-message mb-4">
            {{ generalError }}
          </div>

          <!-- Submit Button -->
          <v-btn :loading="loading" color="primary" type="submit" block>
            Xác nhận
          </v-btn>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.error-message {
  color: red;
  text-align: center;
  font-weight: bold;
}
</style>
