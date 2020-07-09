<template>
  <div>
    <Navbar />
    <div class="container">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Navbar from "./components/Navbar.vue";
export default {
  data() {
    return {};
  },
  components: {
    Navbar
  }
};
</script>

<style lang="scss">
* {
  font-family: "Poppins", sans-serif;
  border-radius: 0px !important;
}
body {
 // background-color: #fee8be;
  background-color: #c1fbdb;
}
</style>
