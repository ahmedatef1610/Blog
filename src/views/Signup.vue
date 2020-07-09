<template>
  <div class="row">
    <div class="col-md-6 mx-auto mt-5">
      <div class="card">
        <div class="card-body">
          <h3 class="card-title text-center mb-4">Signup</h3>
          <div class="form-group">
            <input
              type="text"
              class="form-control"
              :class="{'is-invalid':errors.name,'is-valid':!errors.name && this.submitted}"
              placeholder="Name"
              v-model="name"
            >

            <div class="errors" v-if="errors.name">
              <small
                class="text-danger"
                v-for="(error, index) in errors.name"
                :key="index"
              >{{error}}</small>
            </div>
          </div>

          <div class="form-group">
            <input
              type="email"
              class="form-control"
              :class="{'is-invalid':errors.email,'is-valid':!errors.email && this.submitted}"
              placeholder="Email"
              v-model="email"
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
              type="password"
              class="form-control"
              :class="{'is-invalid':errors.password,'is-valid':!errors.password && this.submitted}"
              placeholder="Password"
              v-model="password"
            >

            <div class="errors" v-if="errors.password">
              <small
                class="text-danger"
                v-for="(error, index) in errors.password"
                :key="index"
              >{{error}}</small>
            </div>
          </div>
          <button class="btn btn-success btn-block" @click="registerUser()" :disabled="loading">
            <i class="fas fa-spinner fa-spin" v-if="loading"></i>
            {{loading?'':'Signup'}}
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
      name: "",
      email: "",
      password: "",
      errors: {},
      submitted: false,
      loading:false,
    };
  },
  methods: {
    registerUser() {
      this.loading=true;
      let data = {
        name: this.name,
        email: this.email,
        password: this.password
      };
      axios
        .post(`${config.apiUrl}/auth/register`, data)
        .then(res => {
          this.loading=false;
          this.submitted = true;
          localStorage.setItem("auth", JSON.stringify(res.data.data));
          this.$root.auth = res.data.data;
          this.$noty.success("Successfully registered.");
          this.$router.push("/home");
        })
        .catch(({ response }) => {
          this.$noty.error("Oops, something went wrong!");
          this.loading=false;
          this.submitted = true;
          this.errors = response.data;
          console.log(response);
        });
    }
  }
};

//https://react-blog-api.bahdcasts.com/
/*
  eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjExODAsImlzcyI6Imh0dHBzOlwvXC9yZWFjdC1ibG9nLWFwaS5iYWhkY2FzdHMuY29tXC9hcGlcL2F1dGhcL3JlZ2lzdGVyIiwiaWF0IjoxNTU5ODQ1NjIzLCJleHAiOjI3Njk0NDU2MjMsIm5iZiI6MTU1OTg0NTYyMywianRpIjoiUlMySkxUM1lDM08wNFppVyJ9.LQthWh9ryIM3uZHpzsIqYYzseFkFMUhmBcJinxlxpJA
*/
</script>

<style>
</style>
