<template>
  <div class="container">
    <div class="user-profile">
      <div class="info">
        <van-image round :src="userInfo.photo" />
        <h3 class="name">
          {{userInfo.name}}
          <br />
          <van-tag size="mini">申请认证</van-tag>
        </h3>
      </div>
      <!--
        van-row/van-col：布局组件
        row:设置行
        col:设置列
          span设置lie的宽度，总数24
      -->
      <van-row>
        <van-col span="6">
          <p>{{userInfo.art_count}}</p>
          <p>动态</p>
        </van-col>
        <van-col span="6">
          <p>{{userInfo.follow_count}}</p>
          <p>关注</p>
        </van-col>
        <van-col span="6">
          <p>{{userInfo.fans_count}}</p>
          <p>粉丝</p>
        </van-col>
        <van-col span="6">
          <p>{{userInfo.like_count}}</p>
          <p>被赞</p>
        </van-col>
      </van-row>
    </div>
    <van-row class="user-links">
      <van-col span="8">
        <van-icon name="newspaper-o" color="#7af" />我的作品
      </van-col>
      <van-col span="8">
        <van-icon name="star-o" color="#f00" />我的收藏
      </van-col>
      <van-col span="8">
        <van-icon name="tosend" color="#fa0" />阅读历史
      </van-col>
    </van-row>

    <van-cell-group class="user-group">
      <van-cell icon="edit" title="编辑资料" to="/user/profile" is-link />
      <van-cell icon="chat-o" title="小智同学" to="/user/chat" is-link />
      <van-cell icon="setting-o" title="系统设置" is-link />
      <van-cell icon="warning-o" title="退出登录" @click="logout()" is-link />
    </van-cell-group>
  </div>
</template>

<script>
// 导入api
import { apiUserInfo } from '@/api/user.js' // 获取用户自己信息
export default {
  name: 'user-index',
  data () {
    return {
      userInfo: {} // 用户自己信息
    }
  },
  created () {
    this.getUserInfo() // 获取用户自己信息
  },
  methods: {
    // 退出系统
    logout () {
      this.$dialog
        .confirm({
          title: '退出',
          message: '确定退出系统吗？'
        })
        .then(() => {
        // 确定退出
        // vuex数据清空
          this.$store.commit('clearUser')
          // 跳转login页面
          this.$router.push('/login')
        })
        .catch(() => {
        // 取消操作
        })
    },
    // 获取用户自己信息
    async getUserInfo () {
      const res = await apiUserInfo()
      // console.log(res)
      this.userInfo = res
    }
  }
}
</script>

<style scoped lang='less'>
.user {
  &-profile {
    width: 100%;
    height: 300px;
    display: block;
    background: #3296fa;
    color: #fff;
    .info {
      display: flex;
      padding: 40px;
      align-items: center;
      .van-image {
        width: 128px;
        height: 128px;
      }
      .name {
        font-size: 32px;
        font-weight: normal;
        margin-left: 20px;
      }
      .van-tag {
        background: #fff;
        color: #3296fa;
      }
    }
    p {
      margin: 0;
      text-align: center;
    }
  }
  &-group {
    margin-bottom: 30px;
  }
  &-links {
    padding: 30px 0;
    font-size: 24px;
    text-align: center;
    background-color: #fff;
    .van-icon {
      display: block;
      font-size: 48px;
      padding-bottom: 10px;
    }
  }
}
</style>
