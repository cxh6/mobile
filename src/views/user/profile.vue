<template>
  <div class="page-user-profile">
    <!-- 导航栏 -->
    <!--
      fixed：使导航栏固定在头部显示
      title:标题，中间显示
      right-text:右侧显示的文字
      @click-right:自定义事件，右侧文字单击事件
      @click-left：自定义事件，左侧文字单击事件
      left-arrow:左侧箭头
    -->
    <van-nav-bar
      left-arrow
      @click-left="$router.back()"
      title="编辑资料"
      right-text="保存"
      @click-right="save()"
    ></van-nav-bar>
  </div>
</template>

<script>
export default {
  name: "user-profile",
  methods: {
    save() {
      // 提示信息
      this.$toast.success("保存成功");
    }
  }
};
</script>

<style scoped lang='less'></style>