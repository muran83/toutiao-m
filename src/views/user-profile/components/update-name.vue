<template>
    <div class="update-name">
        <!-- 导航栏 -->
        <van-nav-bar
        left-arrow
        title="设置昵称"
        left-text="取消"
        right-text="完成"
        @click-left="$emit('close')"
        @click-right="onConfirm"
        />
        <!-- /导航栏 -->
        <!-- 输入框 -->
        <div class="field-wrap">
            <van-field
            v-model.trim="localName"
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
  import { updateUserProfile } from '@/api/user'
  export default {
    // 组件名称
    name: 'UpdateName',
    // 局部注册的组件
    components: {},
    // 组件参数 接收来自父组件的数据
    props: {
      value: {
        type: String,
        required: true
      }
    },
    // 组件状态值
    data () {
      return {
        localName: this.value
      }
    },
    // 计算属性
    computed: {},
    // 侦听器
    watch: {},
    created () { },
    mounted () { },
    // 组件方法
    methods: {
     async onConfirm() {
      this.$toast.loading({
        message: '保存中...',
        forbidClick: true, // 禁止背景点击
        duration: 0 // 持续展示时间
      })
      try {
        const localName = this.localName
        if (!localName) {
          this.$toast('昵称不能为空！')
          return
        }
        const { data } = await updateUserProfile({
          name: localName
        })
        console.log(data)
        // 更新视图
        this.$emit('input', localName)
        // 关闭弹层
        this.$emit('close')
        // 提示成功
        this.$toast.success('更新成功')
      } catch (err) {
        this.$toast.fail('更新失败')
      }
     }
     
    }
  }
  </script>
  
  <style scoped lang="less">
  .field-wrap {
    padding: 10px;
  }
  </style>