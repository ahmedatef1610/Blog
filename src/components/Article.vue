<template>
  <div class="card">
    <div class="card-header">{{article.title}}</div>
    <div class="card-body">
      <!-- <h5 class="card-title">{{article.title}}</h5>
      <h6 class="card-subtitle mb-2 text-muted">{{article.slug}}</h6>-->
      <p class="card-text" v-html="article.content.substring(0,200)"></p>
      <router-link class="btn btn-primary" :to="`/article/${article.id}`">Read More</router-link>
    </div>
  </div>
</template>

<script>
export default {
  props: ["article"]
};
</script>

<style>
</style>
