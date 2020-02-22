<template>
  <div class="container">
    <van-nav-bar fixed left-arrow @click-left="$router.back()" title="文章详情"></van-nav-bar>
    <!-- 文章详情区域 -->
    <div class="detail">
      <h3 class="title">{{article.title}}</h3>
      <div class="author">
        <!-- 头像 -->
        <!--
         fit='fill'：图片填充模式 默认值fill
        -->
        <van-image round width="1rem" height="1rem" fit="fill" :src="article.aut_photo" />
        <div class="text">
          <p class="name">{{article.aut_name}}</p>
          <!-- 使用过滤器 formatTime -->
          <p class="time">{{article.pubdate | formatTime}}</p>
        </div>
        <van-button
          round
          size="small"
          :type="article.is_followed?'default':'info'"
          @click="followMe()"
          :loading="isLoading"
        >{{article.is_followed?'取消关注':'+ 关注'}}</van-button>
        <!-- <van-button round size="small" @click="$store.commit('clearToken')">单清除token</van-button> -->
      </div>
      <!-- 文章内容 -->
      <div class="content">
        <!-- 获取文章结果的内容中带p标签，这里使用v-html -->
        <p v-html="article.content"></p>
      </div>
      <!-- 点赞/不喜欢 -->
      <div class="zan">
        <!-- plain：将按钮设置为朴素按钮，朴素按钮的文字为按钮颜色，背景为白色 -->
        <!-- @click="articleLiking()" 对文章 点赞 / 取消对文章点赞 事件 -->
        <van-button
          round
          size="small"
          :class="{active:article.attitude===1}"
          plain
          icon="like-o"
          style="margin-right:8px;"
          :loading="isLoadinglike"
          @click="articleLiking()"
        >点赞</van-button>
        <!-- @click="articleDislike()" 对文章 不喜欢/取消不喜欢 事件 -->
        <van-button
          round
          size="small"
          plain
          icon="delete"
          :loading="isLoadingDislike"
          @click="articleDislike()"
          :class="{active:article.attitude===0}"
        >不喜欢</van-button>
      </div>
      <!-- 评论列表 -->
      <com-comment></com-comment>
    </div>
  </div>
</template>

<script>
// 导入组件
import ComComment from './components/com-comment.vue'
// 导入api
import {
  apiArticleDetail,
  apiArticleLiking,
  apiArticleUnLiking,
  apiArticleDisliking,
  apiArticleUnDisliking
} from '@/api/article.js' // 获取指定文章详情  对文章点赞 取消对文章点赞 不喜欢 取消不喜欢 api接口
import { apiUserFollow, apiUserUnFollow } from '@/api/user.js' // 关注/取消关注作者
export default {
  name: 'article-index',
  components: { ComComment },
  data () {
    return {
      isLoadinglike: false, // 点击 点赞时 控制按钮是否为加载状态
      isLoadingDislike: false, // 点击不喜欢时 控制按钮是否为加载状态
      isLoading: false, // 点击关注时 控制按钮是否为加载状态
      article: {} // 文章详情
    }
  },
  computed: {
    aid () {
      // 获取指定文章id
      return this.$route.params.aid
    }
  },
  created () {
    this.getArticleById() // 获取指定文章
  },
  methods: {
    // 对文章 不喜欢/取消不喜欢 操作
    async articleDislike () {
      // 点击按钮之后，按钮变为 加载 状态
      this.isLoadingDislike = true
      // 点击按钮之后，延迟0.8s再 切换
      this.$sleep(800)

      // 判断当前状态
      if (this.article.attitude === 0) {
        // 执行 取消 不喜欢
        await apiArticleUnDisliking(this.aid)
        // 同步更新
        this.article.attitude = -1
      } else {
        // 执行 不喜欢
        await apiArticleDisliking(this.aid)
        // 同步更新
        this.article.attitude = 0
      }
      // 切换完之后，按钮恢复状态
      this.isLoadingDislike = false
    },
    // 对文章点赞操作
    async articleLiking () {
      // 点击按钮之后，按钮变为 加载 状态
      this.isLoadinglike = true
      // 点击按钮之后，延迟0.8s再 切换
      this.$sleep(800)

      // 判断当前状态
      if (this.article.attitude === 1) {
        // 如果当前的状态为 红色 1，执行 无状态 操作
        await apiArticleUnLiking(this.aid)
        // 同步更新
        this.article.attitude = -1
      } else {
        // 当前状态为 无状态 -1 ，执行 点赞 操作
        await apiArticleLiking(this.aid)
        // 同步更新
        this.article.attitude = 1
      }
      // 切换完之后，按钮恢复状态
      this.isLoadinglike = false
    },
    // 关注/取消关注 操作
    async followMe () {
      // 点击按钮之后，按钮变为 加载 状态
      this.isLoading = true
      // 点击按钮之后，延迟0.8s再 切换
      this.$sleep(800)

      // 判断当前状态，做不同处理操作
      if (this.article.is_followed) {
        // 取消关注 操作
        await apiUserUnFollow(this.article.aut_id)
        // 同步更新
        this.article.is_followed = false
      } else {
        // 关注 操作,成功 / 失败
        try {
          await apiUserFollow(this.article.aut_id)
          // 同步更新
          this.article.is_followed = true
        } catch (err) {
          this.$toast.fail('不能自己关注自己！')
        }
      }
      // 切换完之后，按钮恢复状态
      this.isLoading = false
    },
    // 获取指定文章详情
    async getArticleById () {
      const res = await apiArticleDetail(this.aid)
      // console.log(res)
      this.article = res
    }
  }
}
</script>

<style scoped lang='less'>
.container {
  height: 100%;
  overflow-y: auto; // 内容溢出，出现滚动条
  box-sizing: border-box;
}
.detail {
  padding: 0 20px;
  .title {
    margin-top: 88px;
    font-size: 36px;
    line-height: 2;
  }
  .zan {
    text-align: center;
    padding: 20px 0;
    .active {
      border-color: red;
      color: red;
    }
  }
  .author {
    padding: 20px 0;
    display: flex;
    position: sticky; // 粘性定位
    background-color: #fff;
    top: 92px;
    z-index: 2;
    .text {
      flex: 1;
      padding-left: 20px;
      line-height: 1.5;
      .name {
        font-size: 14px;
        margin: 0;
      }
      .time {
        margin: 0;
        font-size: 12px;
        color: #999;
      }
    }
  }
  .content {
    padding: 40px 0;
    overflow: hidden;
    white-space: pre-wrap; // 保留空白符序列，但是正常地进行换行
    word-break: break-all; // 允许在单词内换行
    p {
      font-size: 28px;
    }
    /deep/ img {
      max-width: 100%;
      background: #f9f9f9;
    }
    /deep/ code {
      white-space: pre-wrap;
    }
  }
}
</style>
