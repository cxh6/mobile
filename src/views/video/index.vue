<template>
  <div class="container">
    <!-- 骨架屏 -->
    <!-- 
      title:第一行内容
      avatar:小圆圈(头像)
      row:设置行数显示
    -->
    <van-skeleton title avatar :row="3" />
    <van-skeleton title avatar :row="3" />
    <van-skeleton title avatar :row="3" />
  </div>
</template>

<script>
export default {
  name: "video-index"
};
</script>

<style scoped lang='less'>
.van-skeleton {
  margin-top: 10px;
}
</style>