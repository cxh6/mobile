// 1. 导入localize模块函数
import { extend, localize } from 'vee-validate'
// 2.导入要使用的语言
import zhCN from 'vee-validate/dist/locale/zh_CN.json'
// 导入全部规则
import * as rules from 'vee-validate/dist/rules'
// 3.对导入好的语言做注册
localize({
  // 对象成员简易赋值
  zhCN
})
// 4. 使用具体的语言
localize('zhCN')
// 自定义校验
// 对手机号进行格式校验
extend('phone', {
  validate: value => {
    // return true校验成功 false校验失败
    const reg = /^1[35789]\d{9}$/ // 正则校验手机号格式
    return reg.test(value) // 正则匹配校验目标内容，返回Boolean
  },
  message: '{_field_}格式不正确'
})
// 遍历、注册全部的规则
Object.keys(rules).forEach(rule => {
  extend(rule, rules[rule])
})
