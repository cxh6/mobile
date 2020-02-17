<template>
  <!-- 弹出层 -->
  <van-popup
    :value="value"
    @input="$emit('input',$event)"
    round
    closeable
    close-icon-position="top-left"
    position="bottom"
    :style="{ height: '95%' }"
    @close="isEdit=false"
  >
    <div class="channel">
      <div class="channel-head">
        <div>
          <span class="title">我的频道</span>
          <span class="desc">点击进入频道</span>
        </div>
        <div>
          <van-button
            type="danger"
            plain
            size="mini"
            round
            @click="isEdit=!isEdit"
          >{{isEdit?'完成':'编辑'}}</van-button>
        </div>
      </div>
      <!-- 宫格 -->
      <van-grid class="channel-content" :gutter="10" clickable>
        <!--
            van-grid-item宫格单元
            宫格内容：
            1.text属性设置简单内容
            2.匿名插槽设置复杂内容
            :style="{color:k===acticeChannelIndex?'red':'' 设置高亮
        -->
        <van-grid-item v-for="(item,k) in channelList" :key="item.id" @click="clkChannel(item.id,k)">
          <span class="text" :style="{color:k===activeChannelIndex?'red':''}">{{item.name}}</span>
          <!-- 叉号按钮
               v-show 频繁切换更合适
          -->
          <van-icon
            v-show="k>0 && isEdit"
            name="close"
            class="close-icon"
            @click="userToRest(item.id,k)"
          />
        </van-grid-item>
      </van-grid>
    </div>

    <div class="channel">
      <div class="channel-head">
        <div>
          <span class="title">频道推荐</span>
          <span class="desc">点击添加频道</span>
        </div>
      </div>
      <!-- 宫格 -->
      <van-grid class="channel-content" :gutter="10" clickable>
        <!-- 添加频道绑定click事件，传递数据 -->
        <van-grid-item v-for="item in restChannel" :key="item.id" @click="restToUser(item)">
          <div class="info">
            <span class="text">{{item.name}}</span>
          </div>
        </van-grid-item>
      </van-grid>
    </div>
  </van-popup>
</template>

<script>
// 导入api接口
import { apiChannelAll, apiChannelAdd, apiChannelDel } from '@/api/channel.js' // 全部频道 添加频道 删除频道 api
export default {
  name: 'com-channel',
  computed: {
    // 剩余频道
    // 从 全部频道 中过滤掉 我的频道
    restChannel () {
      // 把‘我的频道’的全部id活的到，以数组的格式返回
      // map方法对 channelList 做遍历，返回一个新数组
      // 元素就是channelList数组各个元素的id值，数组长度 与 channelList 一致
      // [10,20,5,21,...]
      const userChannelIds = this.channelList.map(item => {
        return item.id
      })
      // 遍历全部频道，返回不在‘我的频道’出现的频道
      // filter：对channelAll 做过滤，把id值不在userChannelIds数组中出现的元素通过新数组给返回出来
      // [{id:2,name:xxx}...]
      const rest = this.channelAll.filter(item => {
        // Array.includes判断是否包含该元素
        return !userChannelIds.includes(item.id)
      })
      return rest
    }
  },
  props: {
    // 接收父组件v-model的数据信息
    value: {
      type: Boolean,
      default: false
    },
    // 接收父组件传递过来的频道列表
    channelList: {
      type: Array,
      // 数组的默认值要通过如下【箭头函数】方式设置
      default: () => []
    },
    // 接收父组件传递过来的当前选中频道的下标
    activeChannelIndex: {
      type: Number,
      default: 0 // 默认激活频道是推荐(下标为0)
    }
  },
  data () {
    return {
      isEdit: false, // 是否进入编辑状态
      channelAll: [] // 全部频道列表
    }
  },
  created () {
    // 全部频道列表
    this.getChannelAll()
  },
  methods: {
    // 激活频道
    clkChannel (channelID, index) {
      // 判断是否进入编辑状态，编辑状态，执行删除逻辑
      if (this.isEdit && index > 0) {
        this.userToRest(channelID, index)
        return false // 后续代码停止执行
      }
      // 弹出层消失
      this.$emit('input', false)
      // 激活频道
      this.$emit('update:activeChannelIndex', index)
    },
    // 删除频道（我的频道---> 推荐频道）
    // channelID:删除频道id，localStorage
    // index:删除频道在channelList中的下标
    userToRest (channelID, index) {
      // 页面删除
      this.channelList.splice(index, 1)
      // 本地缓存中持久删除
      apiChannelDel(channelID)
      // 如果被删除的频道是最后一个，那么请设置之前一个频道被激活使用
      // 算法： activeChannelIndex -= 1
      // activeChannelIndex 是父组件给传递过来的，即子组件要修改父组件传递过来的数据信息
      // 判断是删除最后一个项目，算法：项目删除后的长度 ====  删除下标
      if (this.channelList.length === index) {
        this.$emit('update:activeChannelIndex', index - 1)
      }
    },
    // 添加频道操作
    // channel 被添加频道的数据 {id:xxx,name:xxx}
    restToUser (channel) {
      // 页面数据的更新
      // channelList 父组件给传递过来的，本身是一个对象，那么它们的传值模式是“引用”
      // 方式（父、子组件关于channelList共同操作，一方修改，另一方也可以感知到）
      this.channelList.push(channel)
      // 本地持久更新
      apiChannelAdd(channel)
    },
    // 全部频道列表
    async getChannelAll () {
      const res = await apiChannelAll()
      // console.log(res)
      this.channelAll = res.channels
    }
  }
}
</script>

<style lang="less" scoped>
.channel {
  margin-top: 70px;
  .channel-head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    .title {
      font-size: 30px;
      margin-right: 5px;
    }
    .desc {
      font-size: 16px;
      color: gray;
    }
  }
  .channel-content {
    .text {
      font-size: 16px;
    }
    .active {
      color: red;
    }
    .close-icon {
      font-size: 20px;
      position: absolute;
      top: -5px;
      right: -5px;
      z-index: 999;
      background-color: #fff;
    }
    .info {
      display: flex;
      align-items: center;
    }
  }
}
</style>
