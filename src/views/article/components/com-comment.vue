<template>
  <div class="comment">
    <!-- 评论列表 -->
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
          <van-button
            icon="like-o"
            size="mini"
            plain
            :type="item.is_liking?'danger':'default'"
          >&nbsp;{{item.like_count}}</van-button>
        </div>
        <!-- 评论内容和时间 -->
        <div slot="label">
          <p v-html="item.content"></p>
          <p>
            <!-- 时间过滤器 -->
            <span>{{item.pubdate|formatTime}}</span>
            ·
            <span
              @click="openReply(item.com_id.toString())"
            >{{item.reply_count}}&nbsp;回复</span>
          </p>
        </div>
      </van-cell>
    </van-list>
    <!-- 回复区域--瀑布流 + 弹出层 -->
    <van-popup v-model="showReply" position="bottom" :style="{ height: '80%' }" round>
      <!-- 瀑布加载效果 -->
      <van-list
        v-model="reply.loading"
        :finished="reply.finished"
        finished-text="没有更多了"
        @load="onLoadReply"
      >
        <van-cell v-for="item in replyList" :key="item.com_id.toString()">
          <!-- 作者头像 -->
          <div slot="icon">
            <img class="avatar" :src="item.aut_photo" alt />
          </div>
          <!-- 作者名称 -->
          <div slot="title">
            <span>{{item.aut_name}}</span>
          </div>
          <!-- 评论内容和时间 -->
          <div slot="label">
            <p v-html="item.content"></p>
            <p>
              <span>{{item.pubdate|formatTime}}</span>
            </p>
          </div>
        </van-cell>
      </van-list>
    </van-popup>
    <!-- 添加评论或回复的小构件 -->
    <div class="reply-container van-hairline--top">
      <van-field v-model.trim="contentCorR" :placeholder="showReply?'写回复...':'写评论...'">
        <!-- van-loading设置加载图标，与提交进行配置使用 -->
        <van-loading v-if="submitting" slot="button" type="spinner" size="16px"></van-loading>
        <span class="submit" v-else slot="button" @click="add()">提交</span>
      </van-field>
    </div>
  </div>
</template>

<script>
// 导入api
import { apiReplyList, apiAddCorR } from '@/api/reply.js' // 指定评论的所有回复信息  添加评论或回复
import { apiCommentList } from '@/api/comment.js' // 指定文章的所有的评论信息
export default {
  name: 'com-comment',
  data () {
    return {
      // 添加评论或回复成员
      contentCorR: '', // 内容
      submitting: false, // 是否正在提交
      // 回复相关
      replyID: null, // 回复id
      nowComID: null, // 当前被激活评论id
      replyList: [], // 回复列表
      showReply: false, // 控制回复弹出层是否显示
      // 回复瀑布相关
      reply: {
        list: [],
        loading: false,
        finished: false
      },

      // 文章评论相关
      commentID: null, // 评论ID
      commentList: [], // 评论列表
      // 评论瀑布流相关
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
    // 添加评论或回复
    async add () {
      // 判断是否有输入内容
      if (!this.contentCorR) {
        return false
      }
      // 有输入内容
      this.submitting = true // 开启提交中
      await this.$sleep(800) // 开启延迟器

      // 判断 回复 弹出层是否显示
      if (this.showReply) {
        // 弹出层开启
        // 执行 回复 操作
        const res = await apiAddCorR({ target: this.nowComID, content: this.contentCorR, art_id: this.aid })
        // console.log(res)
        // 在回复列表顶部追加， 回复信息 新回复信息置顶显示
        this.replyList.unshift(res.new_obj)
        // 找到当前回复的评论，总数量+1
        const comment = this.commentList.find(item => item.com_id.toString() === this.nowComID)
        comment.reply_count++
      } else {
        // 弹出层没有开启
        // 执行评论 操作
        const res = await apiAddCorR({ target: this.aid, content: this.contentCorR })
        // 追加 置顶
        this.commentList.unshift(res.new_obj)
      }
      // 输入框清空
      this.contentCorR = ''
      // 结束提交中
      this.submitting = false
    },
    // 点击回复按钮进行的操作
    openReply (comID) {
      this.showReply = true // 显示弹出层
      this.nowComID = comID // 设置激活评论
      // 恢复设置
      this.replyList = [] // 清空恢复列表
      this.reply.finished = false // 重置瀑布状态
      this.replyID = null // 重置分页标志
    },
    // 回复瀑布流
    async onLoadReply () {
      // 延迟器
      await this.$sleep(800)
      const res = await apiReplyList({
        commentID: this.nowComID,
        replyID: this.replyID
      })
      // console.log(res)
      // 加载动画消失
      this.reply.loading = false
      // 数据加载完成
      if (res.results.length === 0) {
        this.reply.finished = true
        return false
      }
      this.replyList.push(...res.results)
      // 接收relyID
      this.replyID = res.last_id
    },
    // 评论瀑布流
    async onLoad () {
      // 延迟器
      await this.$sleep(800)

      const res = await apiCommentList({
        articleID: this.aid,
        commentID: this.commentID
      })
      // console.log(res)
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
  // 添加评论或回复构件
  .reply-container {
    position: fixed;
    left: 0;
    bottom: 0;
    height: 88px;
    width: 100%;
    background: #f5f5f5;
    z-index: 9999;
    .submit {
      font-size: 24px;
      color: #3296fa;
    }
  }
}
</style>
