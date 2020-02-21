// 导入axios模块
import request from '@/utils/request.js'

// 创建各个api方法

/**
 * 更新用户资料
 * @param {用户昵称} name
 * @param {用户性别} gender
 * @param {生日} birthday
 */
export function apiSaveProfile ({ name, gender, birthday }) {
  return request({
    url: '/app/v1_0/user/profile', // 编辑资料的地址
    method: 'patch',
    data: {
      name,
      gender,
      birthday
    }
  })
}

/**
 * 上传用户头像
 * @param {FormData对象，拥有photo成员，代表被上传头像的文件对象} fdObj
 * FormData是h5发布的技术，可以实现普通表单域信息 和 上传文件域信息的收集工作
 */
export function apiUserPhoto (fdObj) {
  return request({
    url: '/app/v1_0/user/photo', // 编辑头像的地址
    method: 'patch', // 设置头像的类型
    data: fdObj
  })
}

// 获得用户个人资料
export function apiUserProfile () {
  return request({
    url: '/app/v1_0/user/profile',
    method: 'get'
  })
}

/**
 * api:获取用户自己信息
 * 接口文档的目标id 不用传->忽略
 * 接口：【获取用户自己信息】
 */
export const apiUserInfo = () => {
  return request({
    url: '/app/v1_0/user',
    method: 'get'
  })
}

// 关注作者
// target 被关注作者的id
export function apiUserFollow (target) {
  return request({
    url: '/app/v1_0/user/followings',
    method: 'post',
    data: {
      target // 简易成员赋值
    }
  })
}

// 取消关注
// target 被关注作者的id
export function apiUserUnFollow (target) {
  return request({
    url: '/app/v1_0/user/followings/' + target,
    method: 'delete'
  })
}

/**
 * 对登录账户信息进行校验，是一个es6按需导出动作
 * 接口：【用户认证（登录注册）】
 * @param {手机号码} mobile
 * @param {验证码} code
 * 不用看接口文档，改造如下接口方结构，使得参数可以看出来，提升开发效率
 * data: {mobile:xx,code:xx}
 * 给data做对象解构赋值 es6语法结构
 * 业务组件应用(与之前套路一致)：apiUserLogin({mobile:'18463848888',code:246810})
 *
 * 经过如下设计，及时没有任何注释说明，我们也知道该接口需要哪些参数，太妙了
 */
export function apiUserLogin ({ mobile, code }) {
  // 请求axios，request就是axios的复制品，操作结构完全一致
  // return返回执行结果，是promise对象
  return request({
    // url:'差异化url地址'
    url: '/app/v1_0/authorizations',
    method: 'POST',
    data: {
      // 对象成员简易赋值
      mobile, // mobile: mobile
      code
    }
    // params:get请求成员标志
    // data:非get请求成员标志
  })
}
