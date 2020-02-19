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
    <van-cell-group>
      <van-cell is-link title="头像" center>
        <van-image
          slot="default"
          width="56"
          height="56"
          fit="cover"
          round
          src="https://img.yzcdn.cn/vant/cat.jpeg"
        />
      </van-cell>
      <van-cell is-link title="名称" value="用户名称" />
      <van-cell is-link title="性别" value="男" />
      <van-cell is-link title="生日" value="2019-08-08" />
    </van-cell-group>
  </div>
</template>

<script>
export default {
  name: 'user-profile',
  methods: {
    save () {
      // 提示信息
      this.$toast.success('保存成功')
    }
  }
}
</script>

<style scoped lang='less'></style>
