<script setup>
import { ref, reactive, onMounted, onUnmounted } from "vue";
import * as AuthService from "@/services/AuthService";

// Props nhận email từ cha Register
const props = defineProps({
  email: {
    type: String,
    required: true,
  },
});

// Emit để gửi sự kiện về cha Register
const emit = defineEmits(["verified"]);

const otpInputs = reactive(["", "", "", "", "", ""]);
const loading = ref(false);
const generalError = ref("");
const otpError = ref("");
const timer = ref("02:00");
const countdown = ref(120);
let timerInterval;

onMounted(() => {
  startCountdown();
});

onUnmounted(() => {
  clearInterval(timerInterval);
});

// Bộ đếm ngược
const startCountdown = () => {
  const startTime = Date.now();
  const endTime = startTime + countdown.value * 1000;

  timerInterval = setInterval(() => {
    const remainingTime = Math.max(0, endTime - Date.now());
    countdown.value = Math.ceil(remainingTime / 1000);

    const minutes = String(Math.floor(countdown.value / 60)).padStart(2, "0");
    const seconds = String(countdown.value % 60).padStart(2, "0");
    timer.value = `${minutes}:${seconds}`;

    if (countdown.value <= 0) {
      clearInterval(timerInterval);
      alert("Hết thời gian! Vui lòng thử lại.");
    }
  }, 1000);
};

// Chuyển đổi focus giữa các ô nhập OTP
const focusNext = (index) => {
  if (index < otpInputs.length - 1) {
    document.getElementById(`otp-${index + 1}`).focus();
  }
};

const focusPrev = (index) => {
  if (index > 0) {
    document.getElementById(`otp-${index - 1}`).focus();
  }
};

// Lấy mã OTP từ các ô nhập
const getOtp = () => otpInputs.join("");

// Gửi yêu cầu xác thực
const handleVerify = async () => {
  const otp = getOtp();

  if (otp.length !== 6) {
    otpError.value = "OTP phải đủ 6 ký tự.";
    return;
  }

  loading.value = true;
  try {
    await AuthService.verifyAccount(props.email, otp);

    // Emit sự kiện "verified" để thông báo về thành công
    emit("verified", otp);

    // Dừng bộ đếm ngược
    clearInterval(timerInterval);
  } catch (error) {
    generalError.value =
      error?.message || "Xác thực thất bại. Vui lòng thử lại!";
  } finally {
    loading.value = false;
  }
};

const handleRegenerateOTP = async () => {
  loading.value = true;
  try {
    await AuthService.regenerateOTP(props.email);
    alert("OTP mới đã được gửi!");

    // Đặt lại thời gian đếm ngược là 2 phút khi yêu cầu gửi lại OTP
    countdown.value = 120;
    clearInterval(timerInterval);
    startCountdown();
  } catch (error) {
    generalError.value =
      error?.message || "Không thể gửi lại OTP. Vui lòng thử lại!";
  } finally {
    loading.value = false;
  }
};

// Xóa lỗi khi nhập lại
const clearError = () => {
  otpError.value = "";
  generalError.value = "";
};
</script>

<template>
  <v-container class="fill-height d-flex align-center justify-center">
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="8">
        <h2 class="text-center header-title">XÁC THỰC TÀI KHOẢN</h2>
        <p class="text-center mb-4">
          Vui lòng nhập mã OTP mà chúng tôi đã gửi tới email của bạn:
          <br />
          <strong>{{ email }}</strong>
        </p>

        <v-form @submit.prevent="handleVerify">
          <!-- Input OTP -->
          <div class="otp-container mb-4">
            <input
              v-for="(digit, index) in otpInputs"
              :key="index"
              :id="'otp-' + index"
              v-model="otpInputs[index]"
              maxlength="1"
              type="text"
              class="otp-input"
              @input="
                (e) => {
                  clearError();
                  if (e.target.value) focusNext(index);
                }
              "
              @keydown.backspace="
                (e) => {
                  if (!otpInputs[index]) focusPrev(index);
                }
              "
            />
          </div>

          <!-- General Error -->
          <div v-if="otpError" class="error-message mb-4">
            {{ otpError }}
          </div>
          <div v-if="generalError" class="error-message mb-4">
            {{ generalError }}
          </div>

          <!-- Buttons -->
          <v-btn
            :loading="loading"
            type="submit"
            color="primary"
            block
            class="btn-padding"
          >
            Xác thực
          </v-btn>

          <div class="text-center mt-2">
            <span class="resend-label">
              Bạn chưa nhận được mã?
              <span class="resend-link" @click="handleRegenerateOTP"
                >Gửi lại</span
              >
            </span>
          </div>
        </v-form>

        <!-- Countdown Timer -->
        <div class="text-center mt-4">
          <span class="timer-label">Mã có hiệu lực trong:</span>
          <span class="timer">{{ timer }}</span>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.fill-height {
  height: 100%;
}

.otp-container {
  display: flex;
  justify-content: center;
  gap: 8px;
}

.otp-input {
  width: 40px;
  height: 50px;
  text-align: center;
  font-size: 24px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.otp-input:focus {
  outline: none;
  border-color: #007bff;
}

.timer-label {
  font-size: 18px;
}

.timer {
  font-size: 20px;
  font-weight: bold;
  color: #808080;
  margin-left: 8px;
}

.error-message {
  color: red;
  font-weight: bold;
  text-align: center;
}

.resend-link {
  color: #007bff;
  font-weight: bold;
  cursor: pointer;
}

.resend-link:hover {
  text-decoration: underline;
}
</style>
