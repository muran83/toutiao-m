<template>
    <div class="layout-container">
      <!-- 子路由出口 -->
      <router-view />
      <!-- /子路由出口 -->

      <!-- 标签导航栏 -->
      <!--
        route: 开启路由模式，路由模式下会匹配路径和标签的to属性，并自动选中标签
       -->
      <van-tabbar class="layout-tabbar" route>
        <van-tabbar-item :to="{ name: 'home' }"> <!-- 声明式导航完整性传参模式，如果有params参数，要在路由数组中进行配置,例如：/article/:articleId , 使用例子：router-link :to= {name：'',params:{ articleId: xxx}} -->
          <i slot="icon" class="toutiao toutiao-shouye"></i>
          <span class="text">首页</span>
        </van-tabbar-item>
        <van-tabbar-item to="/qa">
          <i slot="icon" class="toutiao toutiao-wenda"></i>
          <span class="text">问答</span>
        </van-tabbar-item>
        <van-tabbar-item to="/video">
          <i slot="icon" class="toutiao toutiao-shipin"></i>
          <span class="text">视频</span>
        </van-tabbar-item>
        <van-tabbar-item to="/my">
          <i slot="icon" class="toutiao toutiao-wode"></i>
          <span class="text">{{ $store.state.user ? '我的' : '未登录' }}</span>
        </van-tabbar-item>
      </van-tabbar>
      <!-- /标签导航栏 -->
    </div>
  </template>

<script>
export default {
  name: 'LayoutIndex',
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
  methods: {}
}
</script>

  <style scoped lang="less">
  .layout-container {
    .layout-tabbar {
      i.toutiao {
        font-size: 40px;
      }
      span.text {
        font-size: 20px;
      }
    }
  }
  </style>
