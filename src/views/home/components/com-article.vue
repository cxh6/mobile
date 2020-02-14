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
        <!-- 模板中使用超大整型的数字，需要自行转变为字符串，调用toString()方法即可 -->
        <!-- <van-cell v-for="item in articleList" :key="item.art_id.toString()" :title="item.title" /> -->
        <!--
         cell单元格
         title：单元格标题
         <template slot="label">：通过作用域插槽体现单元格的‘label描述信息’  slot="label/title/"
        -->
        <van-cell v-for="item in articleList" :key="item.art_id.toString()" :title="item.title">
          <!-- 通过作用域插槽体现单元格的‘label描述信息’ -->
          <template slot="label">
            <!-- van-grid 宫格 -->
            <!--
              border:设置宫格是否有边框
              column-num：宫格列数
            -->
            <!--
              数据部分
              通过cover.type cover.images进行封面图片展示
              v-if：宫格是否有机会体现 type>0
              colum-num:type 1列 3列
             -->
            <van-grid :border="false" v-if="item.cover.type>0" :column-num="item.cover.type">
              <!-- van-grid-item：宫格小单元 -->
              <van-grid-item v-for="(item2,k2) in item.cover.images" :key="k2">
                <!-- van-image 图片组件 -->
                <van-image width="90" height="90" :src="item2" />
              </van-grid-item>
            </van-grid>
            <p>
              <span>作者:{{item.aut_name}}</span>
              &nbsp;
              <span>评论 :{{item.comm_count}}</span>
              &nbsp;
              <span>时间:{{item.pubdate}}</span>
              &nbsp;
            </p>
          </template>
        </van-cell>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
// 导入api接口
import { apiArticleList } from '@/api/article.js' // 文章列表接口
export default {
  name: 'com-article',
  props: {
    // 接收 频道id
    channelID: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      ts: Date.now(), // 声明一个时间戳成员，用于获取文章使用
      articleList: [], // 文章列表
      // 下拉刷新相关成员
      isLoading: false, // 下拉动画是否显示开关
      // --瀑布流相关成员
      list: [], // 加收加载好的数据
      loading: false, // ‘加载中···’动画是否显示（加载的时候设置为true，加载完毕之后设置为false），每次onLoad执行就设置成true，执行完毕之后为false
      finished: false // 加载是否停止的标志，false可以继续加载，true瀑布流停止加载，如果后端没有数据可以提供了，就设置该项目为true即可
    }
  },
  created () {
    //  文章列表
    this.getArticleList()
  },
  methods: {
    // 文章列表
    async getArticleList () {
      const res = await apiArticleList({
        channel_id: this.channelID,
        timestamp: this.ts
      })
      //   console.log(res)
      //   this.articleList = res.results
      // 实现上拉瀑布流效果
      return res
    },
    // 下拉刷新
    onRefresh () {
      setTimeout(() => {
        this.onLoad() // 获取数据一次
        this.isLoading = false // 停止拉取
        this.$toast.success('刷新成功') // 提示信息
      }, 1000)
    },
    // 瀑布流加载
    async onLoad () {
      // 应用延迟器
      // await使得异步变为同步，当前代码没有执行完毕，后续代码等待
      await this.$sleep(800) // 延迟0.8s
      const result = await this.getArticleList()
      //   console.log(result)
      // 判断result.results是否有数据
      if (result.results) {
        // 若有数据 追加articleList中，并且 更新时间戳信息
        // result.results: [{title:xxx,aut_id:xx,..},{...},{...}]
        // ... 扩展运算符，{title:xxx,aut_id:xx,..},{...},{...}
        this.articleList.push(...result.results) // 将刷新获得的数据追加到list列表中
        // 更新时间戳信息
        this.ts = result.pre_timestamp
      } else {
        // 若没有数据，使瀑布流停止加载即可
        this.finished = true // 瀑布流停止加载
      }
      // 不管是 刷新之后有数据 还是 停止加载瀑布流 都得使 加载中动画停止
      this.loading = false // “加载中···” 动画清除
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
