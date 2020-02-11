<template>
  <div class="user-login">
    <!-- 导航栏 -->
    <van-nav-bar title="登录"></van-nav-bar>
    <!-- 表单部分 -->
    <!-- 
        van-cell-group：对普通表单域组件做封装
         van-field 输入框表单域组件
        label="手机号" 表单域前边的名字设置
        required：不进行校验，设置表单域前边有"红星"
        clearable：表单域内容可以通过“叉号”清除
    -->
    <van-cell-group>
      <van-field placeholder="请输入手机号" type="text" label="手机号" required clearable></van-field>
      <van-field placeholder="请输入验证码" type="text" label="验证码" required clearable>
        <!-- 命名插槽应用，提示相关按钮，是要给van-field组件内部的slot去填充的
        size="small" 设置按钮大小的
        type="primary" 设置按钮背景颜色
        -->
        <van-button slot="button" size="small" type="primary">发送验证码</van-button>
      </van-field>
    </van-cell-group>
    <!-- 登录按钮 -->
    <div class="log-btn">
      <!--van-button
        type:按钮背景颜色
        size:按钮大小的
        round：圆圈效果
        block：块级样式设置，占据一行
      -->
      <van-button size="small" type="info" block round>登录</van-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "user-chat"
};
</script>

<style scoped lang='less'>
.user-login {
  .log-btn {
    padding: 20px;
  }
}
</style>
