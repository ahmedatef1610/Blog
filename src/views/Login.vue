<template>
  <div class="row">
    <div class="col-md-6 mx-auto mt-5">
      <div class="card">
        <div class="card-body">
          <h3 class="card-title text-center mb-4">Login</h3>

          <div class="form-group">
            <input
              v-model="email"
              type="email"
              class="form-control"
              placeholder="Email"
              :class="{'is-invalid':errors.email,'is-valid':!errors.email && this.submitted}"
            >

            <div class="errors" v-if="errors.email">
              <small
                class="text-danger"
                v-for="(error, index) in errors.email"
                :key="index"
              >{{error}}</small>
            </div>
          </div>

          <div class="form-group">
            <input
              v-model="password"
              type="password"
              class="form-control"
              placeholder="Password"
              :class="{'is-invalid':errors.password,'is-valid':!errors.password && this.submitted}"
            >
            <div class="errors" v-if="errors.password">
              <small
                class="text-danger"
                v-for="(error, index) in errors.password"
                :key="index"
              >{{error}}</small>
            </div>
          </div>
          <button @click="loginUser" class="btn btn-success btn-block" :disabled="loading">
            <i class="fas fa-spinner fa-spin" v-if="loading"></i>
            {{loading?'':'Login'}}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import config from '../config.js';
export default {
  data() {
    return {
      email: "",
      password: "",
      errors: {},
      submitted: false,
      loading: false
    };
  },
  methods: {
    loginUser() {
      this.loading = true;
      let data = {
        email: this.email,
        password: this.password
      };
      axios
        .post(`${config.apiUrl}/auth/login`, data)
        .then(response => {
          this.loading = false;
          this.submitted = true;
          localStorage.setItem("auth", JSON.stringify(response.data.data));
          this.$root.auth = response.data.data;
          this.$noty.success("Successfully logged in.");
          this.$router.push("/home");
        })
        .catch(({ response }) => {
          this.$noty.error("Oops, something went wrong!");
          this.loading = false;
          if (response.status === 401) {
            this.errors = {
              email: ["these credentials don't match our records."],
              password: ["these credentials don't match our records."]
            };
          } else {
            this.errors = response.data;
          }
          this.submitted = true;
        });
    }
  }
};
</script>

<style>
</style>
