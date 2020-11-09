<template>
  <v-app>
    <v-app-bar :clipped-left="true" fixed app height="80px" color="#fff">
      <div class="title" @click="goHome">
        <div width="100px" class="image">
          <!-- <img src="@/assets/images/LogoAF.svg" alt="ロゴ" /> -->
          <v-toolbar-title class="site-title"><ロゴ></v-toolbar-title>
        </div>
        <v-toolbar-title class="site-title" v-text="title" />
      </div>
    </v-app-bar>

    <div class="page">
      <nuxt />
    </div>

    <!-- <v-footer
      app
      color="#263238"
      height="60px"
      class="d-flex align-center justify-center"
    >
      <p class="copy my-0">
        Copyright© Paradigmshift Inc All Rights Reserved
      </p>
    </v-footer> -->
  </v-app>
</template>

<script>
export default {
  async asyncData() {
    await this.$store.dispatch("listPosts");
    return {
      posts: $store.getters.getterPosts,
      categories: $store.getters.getterPosts
    };
  },
  data() {
    return {
      title: "ご利用ガイド"
    };
  },

  methods: {
    goHome() {
      this.$router.push("/");
    }
  }
};
</script>

<style lang="scss">
.title {
  display: flex;
  align-items: center;
  &:hover {
    cursor: pointer;
  }
}
.image {
  width: 80px;
  margin: 0 24px;
  img {
    display: block;
    width: 100%;
  }
}
.site-title {
  color: #333;
  font-size: 1.4rem;
  font-weight: bold;
  &:hover {
    cursor: pointer;
  }
}
.copy {
  font-size: 1rem;
  color: #fff;
  text-align: center;
}
.page {
  width: 100%;
  position: relative;
  margin-top: 80px;
  background-color: #fff;
  min-height: calc(100vh - 80px);
  color: #333;
  background-color: #f4f4f4;
}
</style>
