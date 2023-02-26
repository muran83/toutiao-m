<template>
    <div class="home-container">
      <!-- 导航栏 -->
      <van-nav-bar class="page-nav-bar">
        <van-button
          class="search-btn"
          slot="title"
          type="info"
          size="small"
          round
          icon="search"
        >搜索</van-button>
      </van-nav-bar>
      <!-- 频道列表  -->
      <!-- /导航栏 -->
      <!--
	使用的组件属性说明:
    通过v-model绑定当前激活标签对应的索引值，默认情况下启用第一个标签
    通过animated属性可以开启切换标签内容时的转场动画
    通过swipeable属性可以开启滑动切换标签页
-->
<van-tabs class="channel-tabs" v-model="active" animated swipeable>
    <van-tab title="标签 1">内容 1</van-tab>
    <van-tab title="标签 2">内容 2</van-tab>
    <van-tab title="标签 3">内容 3</van-tab>
    <van-tab title="标签 4">内容 4</van-tab>
    <van-tab title="标签 1">内容 1</van-tab>
    <van-tab title="标签 2">内容 2</van-tab>
    <van-tab title="标签 3">内容 3</van-tab>
    <van-tab title="标签 4">内容 4</van-tab>
    <div slot="nav-right" class="placeholder"></div>
    <div slot="nav-right" class="hamburger-btn">
        <i class="toutiao toutiao-gengduo"></i>
    </div>
</van-tabs>
      <!-- /频道列表 -->

    </div>
  </template>

<script>
import { ref } from 'vue'
export default {
  name: 'HomeIndex',
  setup() {
    const active = ref(0)
    return { active }
  },
  components: {},
  props: {},
  data () {
    return {

    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    
  }
}
</script>

<style scoped lang="less">
.home-container {
  /deep/ .van-nav-bar__title {
    max-width: unset;
  }
  .search-btn {
    width: 555px;
    height: 64px;
    background-color: #5babfb;
    border: none;
    font-size: 28px;
    .van-icon {
      font-size: 32px;
    }
  }
  /* 添加tabs样式 */
  /deep/ .channel-tabs {
    .van-tabs__wrap {
      height: 82px;
    }
    .van-tab {
      min-width: 200px;
      border-right: 1px solid #edeff3;
      font-size: 30px;
      color: #777777;
    }

    .van-tab--active {
      color: #333333;
    }

    .van-tabs__nav {
      padding-bottom: 0;
    }

    .van-tabs__line {
      bottom: 8px;
      width: 31px !important;
      height: 6px;
      background: #3296fa;
    }
  }
  .placeholder {
  flex-shrink: 0;
  width: 66px;
  height: 82px;
}
  .hamburger-btn {
  position: fixed;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 66px;
  height: 82px;
  background-color: #fff;
  opacity: 0.902;
  i.toutiao {
    font-size: 33px;
    }
    &:before {
        content: "";
        position: absolute;
        left: 0;
        width: 1px;
        height: 50px;
        background-image: url(../../assets/gradient-gray-line.png);
    }
  }
}
</style>