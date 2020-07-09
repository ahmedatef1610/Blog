import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

import Login from './views/Login.vue';
import Signup from './views/Signup.vue';
import Home from './views/Home.vue';
import Article from './views/Article.vue';
import CreateArticle from './views/CreateArticle.vue';

// const auth = localStorage.getItem('auth') ? JSON.parse(localStorage.getItem('auth')) : {};

const routes = [{
    path: '/login',
    component: Login,
    beforeEnter: (to, from, next) => {
      if (JSON.parse(localStorage.getItem('auth'))) {
        next('/home');
      } else {
        next();
      }
    }
  },
  {
    path: '/signup',
    component: Signup,
    beforeEnter: (to, from, next) => {
      if (JSON.parse(localStorage.getItem('auth'))) {
        next('/home');
      } else {
        next();
      }
    }
  },
  {
    path: '/home',
    component: Home,
    beforeEnter: (to, from, next) => {
      if (JSON.parse(localStorage.getItem('auth'))) {
        next();
      } else {
        next('/login');
      }
    }
  },
  {
    path: '/article/:id',
    component: Article,
    beforeEnter: (to, from, next) => {
      if (JSON.parse(localStorage.getItem('auth'))) {
        next( );
      } else {
        next('/login');
      }
    }
  }, {
    path: '/articles/create',
    component: CreateArticle,
    beforeEnter: (to, from, next) => {
      if (JSON.parse(localStorage.getItem('auth'))) {
        next();
      } else {
        next('/login');
      }
    }
  },
  {
    path: '*',
    redirect: '/home'
  }
]

export default new VueRouter({
  mode: 'history',
  routes
});