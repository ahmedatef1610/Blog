<template>
  <div class="row">
    <div class="col-md-8 mx-auto my-5">
      <div class="card">
        <div class="card-body">
          <div class="form-group">
            <div class="hello">
              <picture-input
                accept="image/jpeg, image/png"
                size="10"
                button-class="btn btn-danger"
                @change="onChange"
              ></picture-input>
            </div>
          </div>

          <div class="form-group">
            <select class="form-control" v-model="category">
              <option selected>Select a Category</option>
              <option
                v-for="category in categories"
                :key="category.id"
                :value="category.id"
              >{{category.name}}</option>
            </select>
          </div>

          <div class="form-group">
            <input type="text" class="form-control" placeholder="Title" v-model="title">
          </div>

          <div class="form-group" style="overflow-x: scroll;">
            <wysiwyg v-model="content"/>
          </div>

          <button
            class="btn btn-success btn-lg mx-auto d-block"
            @click="createArticle()"
            :disabled="loading"
          >
            <i class="fas fa-spinner fa-spin" v-if="loading"></i>
            {{loading?'':'Create Article'}}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PictureInput from "vue-picture-input";
import axios from "axios";
import config from "../config.js";

export default {
  data() {
    return {
      title: "",
      content: "",
      image: null,
      categories: [],
      category: "",
      loading: false
    };
  },
  components: {
    PictureInput
  },
  methods: {
    onChange(image) {
      if (image) {
        this.image = image;
      } else {
        console.log("FileReader API not supported: use the <form>, Luke!");
      }
    },
    createArticle() {
      if (!this.title || !this.image || !this.category || !this.content) {
        this.$noty.error("please fill in all fields");
        return;
      }

      this.loading = true;
      const form = new FormData();
      form.append("file", this.image);
      form.append("upload_preset", "izkunnyz");
      form.append("api_key", "593913196431939");

      axios
        .post("https://api.cloudinary.com/v1_1/ahmed1610/image/upload", form)
        .then(response => {
          console.log(response);

          axios
            .post(
              `${config.apiUrl}/articles`,
              {
                title: this.title,
                content: this.content,
                category_id: this.category,
                imageUrl: response.data.secure_url
              },
              {
                headers: {
                  Authorization: `Bearer ${this.$root.auth.token}`
                }
              }
            )
            .then(response => {
              this.loading = false;
              this.$noty.success("Article Created successfully.");
              this.$router.push("/home");
            })
            .catch(({ response }) => {
              this.loading = false;
              this.$noty.error("Oops, something went wrong!");
            });
        })
        .catch(({ response }) => {
          this.loading = false;
          this.$noty.error("Oops, something went wrong!");
        });
    },
    getCategories() {
      let categories = JSON.parse(localStorage.getItem("categories"));
      if (categories) {
        this.categories = categories;
        return;
      }

      axios
        .get(`${config.apiUrl}/categories`)
        .then(response => {
          this.categories = response.data.categories;
          localStorage.setItem("categories", JSON.stringify(this.categories));
        })
        .catch(({ response }) => {
          console.log(response);
        });
    }
  },
  mounted() {
    this.getCategories();
  }
};
//:custom-strings="{  upload: '<h1>Bummer!</h1>', drag: 'Drag a 😺 GIF or GTFO'}"
</script>

<style>
</style>
