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
  >
    <div class="channel">
      <div class="channel-head">
        <div>
          <span class="title">我的频道</span>
          <span class="desc">点击进入频道</span>
        </div>
        <div>
          <van-button type="danger" plain size="mini" round>编辑</van-button>
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
        <van-grid-item v-for="(item,k) in channelList" :key="item.id">
          <span class="text" :style="{color:k===activeChannelIndex?'red':''}">{{item.name}}</span>
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
        <van-grid-item v-for="item in restChannel" :key="item.id">
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
import { apiChannelAll } from '@/api/channel.js' // 全部频道api
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
      channelAll: [] // 全部频道列表
    }
  },
  created () {
    // 全部频道列表
    this.getChannelAll()
  },
  methods: {
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
