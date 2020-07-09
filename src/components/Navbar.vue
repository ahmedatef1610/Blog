<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container">
      <router-link class="navbar-brand" to="/home">
        <img class="logo" src="../assets/logo.png">
      </router-link>

      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav ml-auto">
          <li class="nav-item" v-if="!authUser">
            <router-link class="nav-link" to="/login" active-class="active" exact>Login</router-link>
          </li>
          <li class="nav-item" v-if="!authUser">
            <router-link class="nav-link" to="/signup" active-class="active" exact>Signup</router-link>
          </li>
          <li class="nav-item" v-if="authUser">
            <router-link class="nav-link" to="/articles/create" active-class="active" exact>Create New Article</router-link>
          </li>
          <li class="nav-item dropdown" v-if="authUser">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              id="navbarDropdown"
              data-toggle="dropdown"
            >Hi, {{authUser.name}}</a>
            <div class="dropdown-menu">
              <a class="dropdown-item" @click="logout()">Logout</a>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  computed: {
    authUser() {
      return this.$root.auth.user;
    }
  },
  methods: {
    logout() {
      localStorage.removeItem("auth");
      this.$root.auth={};
      this.$noty.success("Successfully logged out.");
      this.$router.push("/login");
    }
  }
};
</script>

<style scoped lang="scss">
.logo {
  width: 30px;
}
</style>
