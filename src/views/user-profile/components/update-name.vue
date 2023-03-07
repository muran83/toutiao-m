<template>
    <div class="update-name">
        <!-- 导航栏 -->
        <van-nav-bar
        left-arrow
        title="设置昵称"
        left-text="取消"
        right-text="完成"
        @click-left="$emit('close')"
        />
        <!-- /导航栏 -->
        <!-- 输入框 -->
        <div class="field-wrap">
            <van-field
            v-model="message"
            rows="2"
            autosize
            type="textarea"
            maxlength="7"
            placeholder="请输入昵称"
            show-word-limit
            />
        </div>
        <!-- /输入框 -->
    </div>
  </template>
  
  <script>
  export default {
    // 组件名称
    name: 'UpdateName',
    // 局部注册的组件
    components: {},
    // 组件参数 接收来自父组件的数据
    props: {},
    // 组件状态值
    data () {
      return {
        message: ''
      }
    },
    // 计算属性
    computed: {},
    // 侦听器
    watch: {},
    created () { },
    mounted () { },
    // 组件方法
    methods: {}
  }
  </script>
  
  <style scoped lang="less">
  .field-wrap {
    padding: 10px;
  }
  </style>