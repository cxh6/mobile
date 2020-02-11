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
      <!--
        ValidationObserver：对整个表单进行登录时的校验
        ref='xxx':使得组件实例可以【this.$refs.xxx】的方式获得当前的组件对象
      -->
      <ValidationObserver ref="loginFormRef">
        <!--
        ValidationProvider
        name：校验失败，提示当前项目名称的
        rules：设置校验规则，required 必填
        v-slot:接收"作用域插槽"数据，即校验失败错误信息
        -->
        <ValidationProvider name="手机号" rules="required|phone" v-slot="{ errors }">
          <!-- 把校验的错误信息展示出来
        error-message：显示校验失败的错误信息
          -->
          <van-field
            v-model="loginForm.mobile"
            placeholder="请输入手机号"
            type="text"
            label="手机号"
            required
            clearable
            :error-message="errors[0]"
          ></van-field>
        </ValidationProvider>
        <ValidationProvider name="验证码" rules="required" v-slot="{ errors }">
          <van-field
            placeholder="请输入验证码"
            v-model="loginForm.code"
            type="text"
            label="验证码"
            required
            clearable
            :error-message="errors[0]"
          >
            <!-- 命名插槽应用，提示相关按钮，是要给van-field组件内部的slot去填充的
        size="small" 设置按钮大小的
        type="primary" 设置按钮背景颜色
            -->
            <van-button slot="button" size="small" type="primary">发送验证码</van-button>
          </van-field>
        </ValidationProvider>
      </ValidationObserver>
    </van-cell-group>
    <!-- 登录按钮 -->
    <div class="log-btn">
      <!--van-button
        type:按钮背景颜色
        size:按钮大小的
        round：圆圈效果
        block：块级样式设置，占据一行
      -->
      <van-button size="small" type="info" block round @click="login()" :loading="isLogin" loading-text="登录中···">登录</van-button>
    </div>
  </div>
</template>

<script>
// 导入各种api接口
import { apiUserLogin } from '@/api/user.js' // 用户登录
// 验证相关模块导入
import { ValidationProvider, ValidationObserver } from 'vee-validate'
export default {
  name: 'user-chat',
  components: {
    // 注册
    ValidationProvider, // 单个校验
    ValidationObserver // 整体校验
  },
  data () {
    return {
      isLogin: false, // 按钮处于正常状态
      loginForm: {
        mobile: '18463848817', // 手机号
        code: '246810' // 验证码
      }
    }
  },
  methods: {
    // --------登录操作
    async login () {
      // validate()返回promise对象
      const valid = await this.$refs.loginFormRef.validate()
      // console.log(valid)  true/false
      if (!valid) {
        // 校验失败
        return false
      }
      // 按钮处于等待状态
      this.isLogin = true
      // 校验成功，继续执行后续代码
      // 调用api接口，有可能成功，有可能失败
      try {
        const res = await apiUserLogin(this.loginForm)
        // console.log(res); // {token:xxx,refresh_token:xxx}
        // 提示信息
        this.$toast.success('登录成功')
        // 通过vuex维护服务器端返回的token等秘钥信息
        this.$store.commit('updateUser', res)
        // 跳转到home页面
        this.$router.push('/')
      } catch (err) {
        // 提示信息
        this.$toast.fail('手机号或验证码错误' + err)
      }
      // 按钮处于正常状态
      this.isLogin = false
    }
  }
}
</script>

<style scoped lang='less'>
.user-login {
  .log-btn {
    padding: 20px;
  }
}
</style>
