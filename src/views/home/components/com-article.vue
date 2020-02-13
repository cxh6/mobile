<template>
  <div class="scroll-wrapper">
    <!-- B: van-pull-refresh 下拉刷新 -->
    <!--
          v-model="isLoading"：设置下拉效果是否结束，false加载完成，动画消失
          @refresh="onRefresh"：鼠标左键下拉触发的事件
    -->
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <!-- A: van-list --- 上拉动作（瀑布流效果） -->
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
    </van-pull-refresh>
  </div>
</template>

<script>
export default {
  name: 'com-article',
  data () {
    return {
      // 下拉刷新相关成员
      isLoading: false, // 下拉动画是否显示开关
      // --瀑布流相关成员
      list: [], // 加收加载好的数据
      loading: false, // ‘加载中···’动画是否显示（加载的时候设置为true，加载完毕之后设置为false），每次onLoad执行就设置成true，执行完毕之后为false
      finished: false // 加载是否停止的标志，false可以继续加载，true瀑布流停止加载，如果后端没有数据可以提供了，就设置该项目为true即可
    }
  },
  methods: {
    // 下拉刷新
    onRefresh () {
      setTimeout(() => {
        this.onLoad() // 获取数据一次
        this.isLoading = false // 停止拉取
        this.$toast.success('刷新成功') // 提示信息
      }, 1000)
    },
    // 瀑布流加载
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

<style lang="less" scoped>
// 给上拉列表设置样式
.scroll-wrapper {
  height: 100%;
  // 内容过多，有垂直滚动条
  overflow-y: auto;
}
</style>
