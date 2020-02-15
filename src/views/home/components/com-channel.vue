<template>
  <!-- 弹出层 -->
  <van-popup
    :value="value"
    @input="$emit('input',$event)"
    round
    closeable
    close-icon-position="top-left"
    position="bottom"
    :style="{ height: '20%' }"
  ></van-popup>
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
</style>
