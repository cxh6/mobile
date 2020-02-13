<template>
  <div class="container">
    <!-- 标签页 -->
    <van-tabs v-model="activeChannelIndex">
      <!-- title="xxx"：标签名称 -->
      <van-tab v-for="item in channelList" :key="item.id" :title="item.name">
        <!-- 使用 com-article 组件 -->
        <!-- :channelID="item.id"：传递选中频道的id，以便获取对应的文章列表 -->
        <com-article :channelID="item.id"></com-article>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
// 导入com-article组件
import ComArticle from './components/com-article.vue'
// 导入频道api
import { apiChannelList } from '@/api/channel.js'
export default {
  name: 'home-index',
  components: {
    // 注册 com-article
    ComArticle
  },
  data () {
    return {
      channelList: [], // 频道列表
      activeChannelIndex: 0 // 通过下标设置激活频道项目，下标从0开始
    }
  },
  created () {
    this.getChannelList()
  },
  methods: {
    // 频道列表
    async getChannelList () {
      const res = await apiChannelList()
      // console.log(res)
      this.channelList = res.channels
    }
  }
}
</script>

<style scoped lang='less'>
.van-tabs {
  // 弹性布局
  display: flex;
  // 灵活的项目将垂直显示，正如一个列一样
  flex-direction: column;
  height: 100%;
  /deep/ .van-tabs__content {
    // flex:1;的值是1 1 0%，【父控件有剩余空间占1份放大，父控件空间不足按1缩小，自身的空间大小是0%】
    flex: 1;
    overflow: hidden;
  }
  /deep/ .van-tab__pane {
    height: 100%;
  }
  // 给频道下边沿横向设置样式
  /deep/ .van-tabs__line {
    background-color: #1989fa;
  }
}
</style>
