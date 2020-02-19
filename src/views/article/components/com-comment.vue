<template>
  <div class="comment">
    <!--van-list：实现瀑布加载效果-->
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <van-cell v-for="item in commentList" :key="item.com_id.toString()">
        <!-- 作者头像 -->
        <div slot="icon">
          <img class="avatar" :src="item.aut_photo" alt />
        </div>
        <!-- 作者名称 -->
        <div slot="title">
          <span>{{item.aut_name}}</span>
        </div>
        <!-- 点赞 -->
        <div slot="default">
          <van-button icon="like-o" size="mini" plain :type="item.is_liking?'danger':'default'">&nbsp;{{item.like_count}}</van-button>
        </div>
        <!-- 评论内容和时间 -->
        <div slot="label">
          <p v-html="item.content"></p>
          <p>
            <!-- 时间过滤器 -->
            <span>{{item.pubdate|formatTime}}</span>
            ·
            <span>{{item.reply_count}}&nbsp;回复</span>
          </p>
        </div>
      </van-cell>
    </van-list>
  </div>
</template>

<script>
// 导入api
import { apiCommentList } from '@/api/comment.js' // 指定文章的所有的评论信息
export default {
  name: 'ComComment',
  data () {
    return {
      // 文章评论相关
      commentID: null, // 评论ID
      commentList: [], // 评论列表
      list: [],
      loading: false,
      finished: false
    }
  },
  computed: {
    aid () {
      return this.$route.params.aid // 文章id
    }
  },
  methods: {
    async onLoad () {
      // 延迟器
      await this.$sleep(800)

      const res = await apiCommentList({
        articleID: this.aid,
        commentID: this.commentID
      })
      //   console.log(res)
      //   this.commentList = res.results
      // 加载动画消失
      this.loading = false
      //   判断是否有新的数据
      if (res.results.length === 0) {
        // 瀑布流停止
        this.finished = true
        return false
      }
      // 有数据，将新的数据追加到commentList中
      this.commentList.push(...res.results)
      // 接收commentID
      this.commentID = res.last_id
    }
  }
}
</script>

<style lang="less" scoped>
.comment {
  margin-top: 15px;
  .avatar {
    width: 50px;
    height: 50px;
    border-radius: 100%;
    margin-right: 10px;
  }
  /deep/ .van-cell__title {
    .van-cell__label {
      width: 400px;
    }
  }
}
</style>
