<template>
  <div class="container">
    <!-- 导航栏 -->
    <!--
      fixed：使导航栏固定在头部显示
      title:标题，中间显示
      right-text:右侧显示的文字
      @click-right:自定义事件，右侧文字单击事件
    -->
    <van-nav-bar fixed title="黑马头条" right-text="搜索" @click-right="$router.push('/search')" />
    <!-- 中间内容区域 -->
    <div class="my-wrapper">
      <!-- 占位符 -->
      <router-view></router-view>
    </div>
    <!-- 标签栏 -->
    <!--
      route:开启路由，也可以设置v-model属性，这里使用的是route路由模式，故不用设置v-model属性
      to:设置路由跳转地址
      icon:设置显示的icon图标
    -->
    <van-tabbar route>
      <van-tabbar-item to="/home" icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item to="/question" icon="chat-o">问答</van-tabbar-item>
      <van-tabbar-item to="/video" icon="video-o">视频</van-tabbar-item>
      <van-tabbar-item to="/user" icon="user-o">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'Layout'
}
</script>

<style lang="less" scoped>
.container {
  width: 100%;
  height: 100%;
  position: relative;
  .my-wrapper {
    width: 100%;
    height: 100%;
    overflow: hidden;
    // 92px = 页面高度(46px) * 2
    padding-top: 92px;
    padding-bottom: 100px;
    box-sizing: border-box;
    &.noTop {
      padding-top: 0;
    }
  }
}
</style>
