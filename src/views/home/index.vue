<template>
  <div class="container">
    <!-- 标签页 -->
    <van-tabs v-model="activeChannelIndex">
      <!-- title="xxx"：标签名称 -->
      <van-tab title="推荐">推荐1</van-tab>
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
      activeChannelIndex: 0 // 通过下标设置激活项目，下标从0开始
    }
  }
}
</script>

<style scoped lang='less'></style>
