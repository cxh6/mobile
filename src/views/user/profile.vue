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
      <van-cell is-link title="头像" center @click="showPhoto=true">
        <van-image
          slot="default"
          width="56"
          height="56"
          fit="cover"
          round
          :src="userProfile.photo"
        />
      </van-cell>
      <van-cell is-link title="名称" :value="userProfile.name" @click="showName=true" />
      <van-cell
        is-link
        title="性别"
        :value="userProfile.gender===0 ? '男' : '女'"
        @click="showSex=true"
      />
      <van-cell is-link title="生日" :value="userProfile.birthday" @click="showBirthday=true" />
    </van-cell-group>

    <!-- 弹头像 -->
    <van-popup v-model="showPhoto" position="bottom">
      <!-- 内容 -->
      <!-- 1 本地相册选择图片 -->
      <!-- 2 拍照 -->
      <van-cell is-link title="本地相册选择图片"></van-cell>
      <van-cell is-link title="拍照"></van-cell>
    </van-popup>
    <!-- 弹昵称 -->
    <van-popup v-model="showName" position="bottom">
      <!-- 编辑用户昵称 -->
      <van-field v-model.trim="userProfile.name" type="textarea" rows="3"></van-field>
    </van-popup>
    <!-- 弹性别  菜单弹出组件 -->
    <!--
        @select="onSelect" 选取项目的回调处理
        :action="actions" 可选取项目设定 [{name:xxx},{name:xxx}]
        cancel-text="取消" 显示取消按钮
    -->
    <van-action-sheet v-model="showSex" @select="onSelect" :actions="actions" cancel-text="取消"></van-action-sheet>
    <!-- 弹生日 -->
    <van-popup v-model="showBirthday" position="bottom">
      <!-- 时间选取器 -->
      <!--
        v-model="nowDate"  默认显示时间
        type="date" 时间类型
        :min-date="minDate" 最小时间
        @cancel="showBirthday=false" 取消回调
        @confirm="confirmDate" 确认选取时间回调
      -->
      <van-datetime-picker
        v-model="nowDate"
        type="date"
        :min-date="minDate"
        @cancel="showBirthday=false"
        @confirm="confirmDate"
      ></van-datetime-picker>
    </van-popup>
  </div>
</template>

<script>
import dayjs from 'dayjs'
// 导入获得用户个人资料api
import { apiUserProfile } from '@/api/user.js'
export default {
  name: 'user-profile',
  data () {
    return {
      // 弹出层相关
      nowDate: new Date(), // 当前时间
      minDate: new Date('1900-01-01'), // 最小时间
      actions: [{ name: '男' }, { name: '女' }], // 性别选项
      showSex: false, // 性别是否显示弹出层
      showBirthday: false, // 生日是否显示弹出层
      showName: false, // 昵称是否显示弹出层
      showPhoto: false, // 头像是否显示弹出层
      // 用户资料
      userProfile: {
        photo: '',
        name: '我是华仔',
        gender: 0, // 0 男 1 女
        birthday: '1993-09-01'
      }
    }
  },
  created () {
    this.getUserProfile()
  },
  methods: {
    // 弹生日，点击确认执行的回调处理
    confirmDate (val) {
      // console.log(val) // Sun Jun 21 2020 00:00:00 GMT+0800 (中国标准时间)
      // console.log(typeof val) // object
      // 对象格式---> '年-月-日'格式
      // console.log(dayjs(val))  // dayjs 时间对象
      this.userProfile.birthday = dayjs(val).format('YYYY-MM-DD')
      // 关闭
      this.showBirthday = false
    },
    // 弹性别,性别被选中 做回调处理
    onSelect (val) {
      // console.log(val)
      this.userProfile.gender = val.name === '男' ? 0 : 1
      this.showSex = false // 关闭
    },
    // 获得用户个人资料
    async getUserProfile () {
      const res = await apiUserProfile()
      // console.log(res)
      this.userProfile = res
      // 激活显示用户真实生日时间
      // 用户生日是字符串，时间选择器要求是对象
      // 这里需要将 字符串---> 对象 格式
      this.nowDate = new Date(this.userProfile.birthday)
    },
    save () {
      // 提示信息
      this.$toast.success('保存成功')
    }
  }
}
</script>

<style scoped lang='less'></style>
