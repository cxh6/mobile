<template>
  <div class="container">
    <van-nav-bar fixed title="搜索结果" left-arrow @click-left="$router.back()" />
    <!-- 瀑布流 -->
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <van-cell v-for="item in searchList" :key="item.art_id" :title="item.title" />
    </van-list>
  </div>
</template>

<script>
// 导入api
import { apiSearchList } from '@/api/search.js'
export default {
  name: 'search-result',
  data () {
    return {
      page: 1, // 页码
      per_page: 10, // 每页条数
      // 瀑布流相关成员
      list: [],
      loading: false,
      finished: false,
      searchList: [] // 搜索文章结果列表
    }
  },
  computed: {
    // 获得路由参数q，使得组件内部可以通过 this.q 的简便方式获得路由参数
    q () {
      return this.$route.params.q
    }
  },
  // created () {
  //   this.getSearchList() // 获取搜索结果列表
  // },
  methods: {
    // 瀑布流效果
    async onLoad () {
      // 延迟器
      await this.$sleep(800)
      const res = await apiSearchList({
        q: this.q,
        page: this.page,
        per_page: this.per_page
      })
      // console.log(res)
      this.loading = false // 停止加载动画
      // 判断是否刷新出新数据
      if (!res.results.length) {
        // 数据全部加载完成
        this.finished = true
        return false
      }
      // 有新数据，追加
      this.searchList.push(...res.results)
      // 页码累加
      this.page++
    }
    // // 搜索结果列表
    // async getSearchList () {
    //   const res = await apiSearchList({ q: this.q })
    //   // console.log(res)
    //   this.searchList = res.results
    // }
  }
}
</script>

<style lang="less" scoped>
.container {
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  box-sizing: border-box;
  .van-list {
    flex: 1;
    margin-top: 92px;
  }
}
</style>
