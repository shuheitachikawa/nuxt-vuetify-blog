<template>
  <div class="page-container">
    <aside class="aside">
      <v-list class="category__list" rounded width="300px">
        <div class="aside__menu">
          <n-link to="/">
            <h3 class="category__sub all">記事一覧</h3>
          </n-link>
        </div>
        <div class="aside__menu">
          <h3 class="category__sub">記事検索</h3>
          <v-form @submit.prevent="serch" class="serch-area">
            <v-text-field
              label="タイトルor本文で検索"
              v-model="serchWord"
            ></v-text-field>
          </v-form>
        </div>
        <div class="aside__menu">
          <h3 class="category__sub">カテゴリー</h3>
          <v-list-item
            class="category__item"
            v-for="category in categories"
            :key="category.id"
            link
            :to="{ path: `/category/${category.id}` }"
          >
            <v-list-item-content>
              <v-list-item-title>{{ category.name }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </div>
      </v-list>

      <button class="contact">
        <a href="" target="_brank">お問い合わせ</a>
      </button>
    </aside>

    <div class="main">
      <v-container>
        <nuxt-child :serchedWord="serchWord" />
      </v-container>
    </div>
  </div>
</template>

<script>
export default {
  async asyncData({ $axios, $config }) {
    const { data } = await $axios.get(
      "/categories",
      {
        headers: { "X-API-KEY": $config.API_KEY }
      }
    );
    return {
      categories: data.contents
    };
  },
  data() {
    return {
      categories: [],
      serchWord: ""
    };
  },
  methods: {
    serch() {
      if (this.serchWord) {
        this.$router.push(`/serch/${this.serchWord}`);
      } else {
        this.$router.push("/");
      }
    }
  }
};
</script>

<style lang="scss">
a {
  text-decoration: none;
}
.page-container {
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  height: 100%;
  background-color: #fff;
}
.aside {
  position: sticky;
  padding-top: 20px;
  top: -20px;
  align-self: baseline;
  width: 25%;
  min-height: 100%;
  border-right: 1px solid rgb(202, 202, 202);
  &__menu {
    margin-bottom: 16px;
  }
}
.category {
  &__sub {
    margin-bottom: 8px;
    &.all {
      color: #333;
      &:hover {
        text-decoration: underline;
      }
    }
  }
  &__list {
    position: fixed;
    display: block;
  }
  &__item {
    margin-bottom: 0;
  }
  &__title {
    font-weight: bold;
    font-size: 1.1rem;
  }
}
.main {
  width: 80%;
}
.contact {
  position: fixed;
  bottom: 16px;
  margin-left: 8px;
  font-weight: bold;
  border-radius: 5px;
  background-color: #e7e7f3;
  text-align: center;
  width: 100%;
  max-width: 315px;
  padding: 8px;
}
.serch-area {
  padding-left: 20px;
}
</style>
