<template>
  <div>
    <!--
        van-dialog弹出框
        v-model='show'：控制是否显示对话框 true 显示 false 隐藏
        show-confirm-button="false"：不显示“确定”按钮
        close-on-click-overlay：点击旁处，关闭弹出层
    -->
    <!-- <van-dialog v-model="show" close-on-click-overlay show-confirm-button="false">内容</van-dialog> -->
    <!--
        @input：当前组件的value值发生变化，要传递给父组件的v-model里面去，使得弹出框可以不断完成关闭、显示操作
        $emit('input',$event)这样配置，van-dialog组件内部已经把$event.target.value都集成好了
        如果当前的标签是普通的input框标签，那么$emit('input',$event.target.value)这样配置
    -->
    <van-dialog
      :value="value"
      @input="$emit('input',$event)"
      close-on-click-overlay
      :show-confirm-button="false"
    >
      <!-- 单元格组件 -->
      <van-cell-group v-if="isOneLevel">
        <van-cell icon="location-o" title="不感兴趣" @click="articleDislike()" />
        <van-cell icon="location-o" title="反馈垃圾内容" is-link @click="isOneLevel=false" />
        <van-cell icon="location-o" title="拉黑作者" />
      </van-cell-group>
      <van-cell-group v-else>
        <van-cell icon="arrow-left" @click="isOneLevel=true" />
        <van-cell v-for="item in reportsList" :key="item.value" :title="item.title" icon="location-o" />
      </van-cell-group>
    </van-dialog>
  </div>
</template>

<script>
// 导入api
import { apiArticleDislike } from '@/api/article.js'
export default {
  name: 'com-moreaction',
  props: {
    // 接收不感兴趣文章id
    articleID: {
      type: String,
      required: true // 必须传递
    },
    // 接收父组件传递过来的信息
    value: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      // 举报类型：
      reportsList: [
        { title: '其他问题', value: 0 },
        { title: '标题夸张', value: 1 },
        { title: '低俗色情', value: 2 },
        { title: '错别字多', value: 3 },
        { title: '旧闻重复', value: 4 },
        { title: '广告软文', value: 5 },
        { title: '内容不实', value: 6 },
        { title: '涉嫌违法犯罪', value: 7 },
        { title: '侵权', value: 8 }
      ],
      isOneLevel: true // 判断展示一级 或 二级 反垃圾内容 true:一级  false:二级
      // show: true
    }
  },
  methods: {
    // 文章不感兴趣
    async articleDislike () {
      await apiArticleDislike(this.articleID)
      // console.log(res)
      // 弹出框消失
      this.$emit('input', false) // 使得父组件showDialog变为false
      // 提示信息
      this.$toast.success('对文章处理成功！')
      // 删除不感兴趣的文章
      this.$emit('dislikeSuccess')
    }
  }
}
</script>

<style lang="less" scoped>
</style>
