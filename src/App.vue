<template>
  <v-app>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",
  components: {},
};
</script>

<style>
/* Định dạng tổng quan cho toàn bộ ứng dụng */
body {
  margin: 0;
  font-family: "Inter", sans-serif;
}
</style>
