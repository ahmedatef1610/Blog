<template>
  <div>
    <div class="d-flex justify-content-between my-3">
      <button class="btn btn-warning text-white" :disabled="articles.prev_page_url==null" @click="getPrevArticles">Prev Page</button>
      <p>Page: {{articles.current_page}}</p>
      <button class="btn btn-warning text-white" :disabled="articles.next_page_url==null" @click="getNextArticles">Next Page</button>
    </div>
    <div class="row" v-if="!loading">
      <div class="col-md-8 mx-auto my-3"  v-for="(article) in articles.data" :key="article.id">
        <Article :article="article" />
      </div>
    </div>
    <div class="loading text-center mt-5" v-else>
      <i class="fas fa-spinner fa-spin fa-3x"></i>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import config from "../config.js";
import Article from "../components/Article.vue";

export default {
  data() {
    return {
      articles: {},
      loading:true,
    };
  },
  components: {
    Article
  },
  methods: {
    getArticles(url=`${config.apiUrl}/articles`) {
      this.loading=true;
      axios
        .get(url)
        .then(response => {
          this.loading=false;
          // console.log(response);
          this.articles = response.data.data;
        })
        .catch(({ response }) => {
          this.loading=false;
          // console.log(response);
        });
    },
    getNextArticles(){
      this.getArticles(this.articles.next_page_url);
    },
    getPrevArticles(){
      this.getArticles(this.articles.prev_page_url);
    }
  },
  mounted() {
    this.getArticles();
  }
};
</script>

<style>
</style>

