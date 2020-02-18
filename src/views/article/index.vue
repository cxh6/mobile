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
        <van-button round size="small" :type="article.is_followed?'default':'info'">{{article.is_followed?'取消关注':'+ 关注'}}</van-button>
      </div>
      <!-- 文章内容 -->
      <div class="content">
        <!-- 获取文章结果的内容中带p标签，这里使用v-html -->
        <p v-html="article.content"></p>
      </div>
      <!-- 点赞/不喜欢 -->
      <div class="zan">
        <!-- plain：将按钮设置为朴素按钮，朴素按钮的文字为按钮颜色，背景为白色 -->
        <van-button
          round
          size="small"
          :class="{active:article.attitude===1}"
          plain
          icon="like-o"
          style="margin-right:8px;"
        >点赞</van-button>
        <van-button round size="small" plain icon="delete" :class="{active:article.attitude===0}">不喜欢</van-button>
      </div>
    </div>
  </div>
</template>

<script>
// 导入api
import { apiArticleDetail } from '@/api/article.js' // 获取指定文章详情api接口
export default {
  name: 'article',
  data () {
    return {
      // is_followed: false, // 是否关注了作者
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
