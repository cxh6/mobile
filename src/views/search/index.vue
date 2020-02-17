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
    searchText (newV, oldV) {
      // 判断搜索框是否有变化
      if (!newV) {
        this.suggestionList = [] // 没有关键字内容
        return false
      }
      // 防抖操作:setTimeout + clearTime
      // 设置防抖，防止频繁发送请求
      // timer是组件data成员，就是临时的，不用在data中事先声明
      // 清除
      clearTimeout(this.timer)
      this.timer = setTimeout(async () => {
        const res = await apiSuggestionList({ q: newV })
        // console.log(res)
        this.suggestionList = res.options
      }, 1000)
    }
  }
}
</script>

<style scoped lang='less'></style>
