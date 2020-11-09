<template>
  <div class="post">
    <p class="post__category">{{ post.category.name }}</p>
    <h1 class="post__title">{{ post.title }}</h1>
    <p class="post__updated">最終更新日: {{post.updatedAt.substr(0,10)}}</p>

    <div class="heading" v-if="post.heading">
      <p class="heading__title">目次</p>
      <ul class="heading__list">
        <li
          v-for="item in toc"
          :key="item.id"
          :class="`heading__item ${item.name}`"
        >
          <n-link v-scroll-to="`#${item.id}`" to>{{ item.text }}</n-link>
        </li>
      </ul>
    </div>

    <div class="post__content" v-html="post.content"></div>
  </div>
</template>

<script>
import cheerio from "cheerio";
import VueScrollTo from "vue-scrollto";
export default {
  async asyncData({ $axios, params, $config }) {
    const { data } = await $axios.get(
      `/blog/${params.id}`,
      {
        headers: { "X-API-KEY": $config.API_KEY }
      }
    );
    const $ = cheerio.load(data.content);
    const headings = $("h2, h3").toArray();
    const toc = headings.map(data => ({
      text: data.children[0].data,
      id: data.attribs.id,
      name: data.name,
    }));
    return {
      post: data,
      toc: toc,
    };
  },
  data() {
    return {
      post: "",
      toc: "",
    };
  }
};
</script>

<style lang="scss" scoped>
.heading {
  margin-top: 24px;
  padding: 16px;
  background-color: #f4f4f4;
  &__title {
    font-weight: bold;
    margin-bottom: 8px;
  }
  &__list {
    padding-left: 8px;
  }
  &__item {
    list-style: none;
    margin-bottom: 8px;
    border-bottom: 1px solid #c6c6d8;
    a {
      display: block;
      height: 100%;
      width: 100%;
    }
    &.h2 {
      font-weight: bold;
    }
    &.h3 {
      padding-left: 8px;
    }
  }
}
$marginy: 24px;
.post {
  padding: 8px;
  &__title:hover {
    text-decoration: none;
  }
  &__updated {
    margin-top: 16px;
    font-size: 0.9rem;
  }
  &__content {
    margin-top: $marginy;
    &::v-deep h1 {
      margin: $marginy 0;
      padding: 8px 16px;
      border-radius: 5px;
    }
    &::v-deep h2 {
      margin: $marginy 0;
      padding: 8px 16px;
      border-radius: 5px;
      background-color: #f4f4f4;
    }
    &::v-deep h3 {
      margin: $marginy 0;
      padding: 0 16px;
      border-radius: 5px;
    }
    &::v-deep h4 {
      margin: $marginy 0;
      padding: 8px 16px;
      border-radius: 5px;
    }
    &::v-deep h5 {
      margin: $marginy 0;
      padding: 8px 16px;
      border-radius: 5px;
    }
    &::v-deep p {
      margin: $marginy 0;
      padding: 0 16px;
    }
    &::v-deep ul {
      margin: $marginy 0;
      padding: 0 40px;
    }
    &::v-deep ol {
      margin: $marginy 0;
      padding: 0 40px;
    }
    &::v-deep li {
      margin: 8px 0;
    }
    &::v-deep img {
      display: block;
      margin: $marginy auto;
      width: 80%;
    }
    &::v-deep blockquote {
      margin: $marginy auto;
      padding: 0 24px;
      position: relative;
      &::before{
        position: absolute;
        display: block;
        content:"";
        width:3px;
        height: 20px;
        background-color: #dddddd;
        left: 16px;
      }
    }
    &::v-deep a {
      margin: $marginy auto;
      font-weight: bold;
      &:hover{
        text-decoration: underline;
      }
    }
  }
}
</style>
