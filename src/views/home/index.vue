<template>
  <div class="container">
    <!-- 标签页 -->
    <van-tabs v-model="activeChannelIndex">
      <!-- title="xxx"：标签名称 -->
      <van-tab title="推荐">
        <div class="scroll-wrapper">
          <!-- van-list --- 上拉动作（瀑布流效果） -->
          <!--
          v-model="loading"：加载动画效果（加载中···）
          :finished="finished"：是否停止加载，false继续，true停止
          finished-text="没有更多了"：停止加载的文字提示
          @load="onLoad"：加载数据的回调事件，页面初次加载/滚轮滚动到系统设置的页面底部 都会自动触发
          -->
          <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
            <!--
            van-cell - 单元格组件，内容独占一行进行显示，使用别的div也可以
                      :title="item":单元格标题
            -->
            <van-cell v-for="item in list" :key="item" :title="item" />
          </van-list>
        </div>
      </van-tab>
      <van-tab title="数据库">数据库1</van-tab>
      <van-tab title="后端">后端1</van-tab>
    </van-tabs>
  </div>
</template>

<script>
export default {
  name: 'home-index',
  data () {
    return {
      // --瀑布流相关成员
      list: [], // 加收加载好的数据
      loading: false, // ‘加载中···’动画是否显示（加载的时候设置为true，加载完毕之后设置为false），每次onLoad执行就设置成true，执行完毕之后为false
      finished: false, // 加载是否停止的标志，false可以继续加载，true瀑布流停止加载，如果后端没有数据可以提供了，就设置该项目为true即可
      // --通过下标设置激活频道项目，下标从0开始
      activeChannelIndex: 0
    }
  },
  methods: {
    onLoad () {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          this.list.push(this.list.length + 1)
        }

        // 加载状态结束
        this.loading = false // 加载中···动画清除

        // 数据全部加载完成
        if (this.list.length >= 40) {
          this.finished = true // 瀑布流停止加载
        }
      }, 1000)
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
    // 给上拉列表设置样式
    .scroll-wrapper {
      height: 100%;
      // 内容过多，有垂直滚动条
      overflow-y: auto;
    }
  }
  // 给频道下边沿横向设置样式
  /deep/ .van-tabs__line {
    background-color: #1989fa;
  }
}
</style>
