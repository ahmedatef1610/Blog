<template>
  <div class="row">
    <div class="col-md-8 mx-auto my-5">
      <div class="card" v-if="!loading">
        <img :src="article.imageUrl" class="card-img-top" alt="error in loading image">
        <div class="card-body">
          <h1 class="card-title text-center my-3">{{article.title}}</h1>
          <p class="card-text" v-html="article.content"></p>
          <div class="dropdown-divider mb-5"></div>
          <div class="comments my-3">
            <vue-disqus
              shortname="blog-1610"
              :identifier="(article.id).toString()"
              :url="url"
            ></vue-disqus>
          </div>
           <!-- <div class="dropdown-divider my-5"></div>
          <button class="btn btn-primary">Go somewhere</button> -->
        </div>
      </div>
      <div class="loading text-center mt-5" v-else>
        <i class="fas fa-spinner fa-spin fa-3x"></i>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import config from "../config.js";

export default {
  data() {
    return {
      article: {},
      loading: true,
      url:window.location.href
    };
  },
  methods: {
    getArticle() {
      axios
        .get(`${config.apiUrl}/article/${this.$route.params.id}`)
        .then(response => {
          this.loading = false;
        //   console.log(response);
          this.article = response.data.data;
        })
        .catch(({ response }) => {
          this.loading = false;
        //   console.log(response);
        });
    }
  },
  mounted() {
    this.getArticle();
  }
};
</script>

<style>
</style>
