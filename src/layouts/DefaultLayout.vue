<template>
  <div>
    <!-- Header dùng chung -->
    <UserHeader />

    <!-- Sidebar -->
    <Sidebar />

    <!-- Nội dung chính -->
    <main>
      <router-view />
    </main>

    <!-- Footer dùng chung -->
    <UserFooter />
  </div>
</template>

<script>
import UserHeader from "@/components/common/Header.vue";
import Sidebar from "@/common/Sidebar.vue";
import UserFooter from "@/components/common/Footer.vue";

export default {
  components: {
    UserHeader,
    Sidebar,
    UserFooter,
  },
};
</script>

<style>
/* Thêm style cho layout nếu cần */
main {
  margin-left: 240px; /* Dành không gian cho Sidebar */
  padding: 20px;
}
</style>
