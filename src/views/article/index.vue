<template>
  <div class="container">
    <van-nav-bar fixed left-arrow @click-left="$router.back()" title="文章详情"></van-nav-bar>
  </div>
</template>

<script>
// 导入api
import { apiArticleDetail } from '@/api/article.js' // 获取指定文章详情api接口
export default {
  name: 'article',
  data () {
    return {
      article: {} // 文章详情
    }
  },
  computed: {
    aid () {
      // 获取指定文章id
      return this.$route.params.aid
    }
  },
  created () {
    this.getArticleById() // 获取指定文章
  },
  methods: {
    // 获取指定文章详情
    async getArticleById () {
      const res = await apiArticleDetail(this.aid)
      // console.log(res)
      this.article = res
    }
  }
}
</script>

<style scoped lang='less'></style>
