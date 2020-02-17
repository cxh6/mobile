<template>
  <div class="container">
    <van-nav-bar title="搜索中心" left-arrow @click-left="$router.back()" />
    <van-search v-model.trim="searchText" placeholder="请输入搜索关键词" />
    <van-cell-group>
      <van-cell v-for="(item,k) in suggestionList" :key="k" :title="item" icon="search" />
    </van-cell-group>
  </div>
</template>

<script>
// 导入api
import { apiSuggestionList } from '@/api/search.js'
export default {
  name: 'search-index',
  data () {
    return {
      suggestionList: [], // 联想到的数据
      searchText: '' // 搜索关键词
    }
  },
  watch: {
    // 对 搜索关键词进行监听
    async searchText (newV, oldV) {
      // 判断搜索框是否有变化
      if (!newV) {
        this.sugguestionList = [] // 没有关键字内容
        return false
      }
      const res = await apiSuggestionList({ q: newV })
      // console.log(res)
      this.suggestionList = res.options
    }
  }
}
</script>

<style scoped lang='less'></style>
