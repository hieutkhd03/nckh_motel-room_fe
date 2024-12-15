<script setup>
import { ref, onMounted } from "vue";
import * as AuthService from "@/services/AuthService";
import { useRouter } from "vue-router";

const token = ref(null);
const fullName = ref("");
const isAuthenticated = ref(false);
const router = useRouter();

const checkAuthentication = () => {
  const user = AuthService.getCurrentUser();
  if (user && user.token) {
    token.value = user.token;
    fullName.value = user.fullName || "Người dùng";
    isAuthenticated.value = true;
  } else {
    isAuthenticated.value = false;
    console.warn("Không tìm thấy token hoặc người dùng chưa đăng nhập.");
  }
};

// Logout function
const logout = () => {
  AuthService.logout(); // Xóa thông tin người dùng khỏi localStorage
  router.push("/login");
};

onMounted(() => {
  checkAuthentication();
});
</script>

<template>
  <v-carousel show-arrows="hover">
    <v-carousel-item
      src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
      cover
    ></v-carousel-item>

    <v-carousel-item
      src="https://cdn.vuetifyjs.com/images/cards/hotel.jpg"
      cover
    ></v-carousel-item>

    <v-carousel-item
      src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
      cover
    ></v-carousel-item>
  </v-carousel>

  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="8">
        <v-card>
          <v-card-title>
            <h1 v-if="isAuthenticated">Chào mừng, {{ fullName }}</h1>
          </v-card-title>
          <v-card-text>
            <div v-if="token">
              <p><strong>JWT Token:</strong> {{ token }}</p>
            </div>
            <div v-else>
              <p>Vui lòng đăng nhập để tiếp tục.</p>
            </div>
          </v-card-text>
          <v-card-actions v-if="isAuthenticated">
            <v-btn color="error" block @click="logout"> Đăng xuất </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.home-page {
  padding: 20px;
  text-align: center;
}
</style>
