<template>
  <v-app>
    <!-- Header -->
    <HeaderComponent />

    <!-- Sidebar -->
    <SidebarComponent />

    <!-- Nội dung chính -->
    <v-main>
      <router-view />
    </v-main>

    <!-- Footer -->
    <FooterComponent />
  </v-app>
</template>

<script>
import HeaderComponent from "@/common/Header.vue";
import SidebarComponent from "@/common/Sidebar.vue";
import FooterComponent from "@/common/Footer.vue";

export default {
  name: "App",
  components: {
    HeaderComponent,
    SidebarComponent,
    FooterComponent,
  },
};
</script>

<style>
/* Định dạng tổng quan cho toàn bộ ứng dụng */
body {
  margin: 0;
  font-family: Arial, sans-serif;
}
</style>
