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
          :src="userProfile.photo"
        />
      </van-cell>
      <van-cell is-link title="名称" :value="userProfile.name" />
      <van-cell is-link title="性别" :value="userProfile.gender===0 ? '男' : '女'" />
      <van-cell is-link title="生日" :value="userProfile.birthday" />
    </van-cell-group>
  </div>
</template>

<script>
// 导入获得用户个人资料api
import { apiUserProfile } from '@/api/user.js'
export default {
  name: 'user-profile',
  data () {
    return {
      userProfile: {
        photo: '',
        name: '我是华仔',
        gender: 0, // 0 男 1 女
        birthday: '1993-09-01'
      } // 用户资料
    }
  },
  created () {
    this.getUserProfile()
  },
  methods: {
    // 获得用户个人资料
    async getUserProfile () {
      const res = await apiUserProfile()
      // console.log(res)
      this.userProfile = res
    },
    save () {
      // 提示信息
      this.$toast.success('保存成功')
    }
  }
}
</script>

<style scoped lang='less'></style>
