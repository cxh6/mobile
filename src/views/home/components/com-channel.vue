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
        <van-grid-item v-for="value in 8" :key="value" text="文字">
          <span class="text">文字</span>
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
        <van-grid-item v-for="value in 8" :key="value" text="文字">
          <div class="info">
            <span class="text">文字</span>
          </div>
        </van-grid-item>
      </van-grid>
    </div>
  </van-popup>
</template>

<script>
export default {
  name: 'com-channel',
  props: {
    value: {
      type: Boolean,
      default: false
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
