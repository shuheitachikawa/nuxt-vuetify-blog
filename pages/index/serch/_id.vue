<template>
  <v-container>
    <v-list class="list" width="100%">
      <v-list-item
        width="100%"
        class="item"
        v-for="post in posts"
        :key="post.id"
      >
        <n-link :to="{ path: `/post/${post.id}` }">
          <v-card color="#f4f4f4" elevation="0" class="my-2" width="100%">
            <v-card-title>{{ post.title }}</v-card-title>
            <v-card-subtitle>{{
              post.updatedAt.substr(0, 10)
            }}</v-card-subtitle>
          </v-card>
        </n-link>
      </v-list-item>
      <v-list-item v-if="!posts.length">
        <v-card color="#f4f4f4" elevation="0" class="my-2" width="100%">
          <v-card-title>該当する記事がありません</v-card-title>
        </v-card>
      </v-list-item>
    </v-list>
  </v-container>
</template>

<script>
export default {
  async asyncData({ $axios, params, $config }) {
    const { data } = await $axios.get(
      `/blog?filters=title[contains]${params.id}[or]content[contains]${params.id}`,
      {
        headers: { "X-API-KEY": $config.API_KEY }
      }
    );
    return {
      posts: data.contents
    };
  },
  data() {
    return {
      posts: []
    };
  }
};
</script>

<style lang="scss">
a {
  display: block;
  width: 100%;
  height: 100%;
}
.item {
  list-style: none;
}
</style>
