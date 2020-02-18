<template>
  <div class="container">
    <van-nav-bar title="搜索中心" left-arrow @click-left="$router.back()" />
    <!-- @search="onSearch()"：按下回车执行的事件 -->
    <van-search v-model.trim="searchText" placeholder="请输入搜索关键词" @search="onSearch(searchText)" />
    <van-cell-group>
      <!-- <van-cell v-for="(item,k) in suggestionList" :key="k" :title="item" icon="search" /> -->
      <!-- @click='onSearch()'  点击，执行onSearch事件 -->
      <van-cell v-for="(item,k) in suggestionList" :key="k" icon="search" @click='onSearch(item)'>
        <!-- slot="title"使用命名插槽 覆盖 title内容 -->
        <span slot="title" v-html="highlightCell(item,searchText)"></span>
      </van-cell>
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
  methods: {
    // 搜索结果处理
    onSearch (keywords) {
      // 跳转页面
      this.$router.push({ name: 'result', params: { q: keywords } })
    },
    // 关键词高亮设置
    highlightCell (item, keywords) {
      // 正则
      const reg = new RegExp(`${keywords}`, 'i') // 忽略大小写
      // 获取匹配内容
      const res = item.match(reg)
      // match() 方法可在字符串内检索指定的值，或找到一个或多个正则表达式的匹配
      // console.log(res)   res[0] 匹配到的内容
      return item.replace(res, `<span style="color:red;">${res[0]}</span>`)
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
