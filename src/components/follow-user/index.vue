<template>
  <van-button
  v-if="isFollowed"
    class="follow-btn"
    round
    :loading="loading"
    size="small"
    @click="onFollow"
  >已关注</van-button>
  <van-button
  v-else
    class="follow-btn"
    type="info"
    color="#3296fa"
    round
    :loading="loading"
    size="small"
    icon="plus"
    @click="onFollow"
  >关注</van-button>
</template>

<script>
import { addFollow, deleteFollow } from '@/api/user'
export default {
  // 组件名称
  name: 'FollowUser',
  // 局部注册的组件
  components: {},
  model: {
    prop: 'isFollowed',
    event: 'update-is_followed'
  },
  // 组件参数 接收来自父组件的数据
  props: {
    isFollowed: {
        type: Boolean,      
        required: true
    },
    userId: {
        type: [String, Number, Object],
        required: true
    }
  },
  // 组件状态值
  data () {
    return {
        loading: false
    }
  },
  // 计算属性
  computed: {},
  // 侦听器
  watch: {},
  // 生命周期钩子   注：没用到的钩子请自行删除
  /**
  * 组件实例创建完成，属性已绑定，但DOM还未生成，el属性还不存在
  */
  created () {},
  /**
  * el 被新创建的 vm.el 替换，并挂载到实例上去之后调用该钩子。
  * 如果 root 实例挂载了一个文档内元素，当 mounted 被调用时 vm.el 也在文档内。
  */
  mounted () {},
  // 组件方法
  methods: {
    async onFollow () {
    this.loading = true // 展示关注按钮的 loading 状态
    try {
      if (this.isFollowed) {
        // 已关注，点击取消关注
        await deleteFollow(this.userId)
        // this.article.is_followed = false
      } else {
          // 没有关注，添加关注
          await addFollow(this.userId)
          // this.article.is_followed = true
      }
        // 更新视图状态
        this.$emit('update-is_followed', !this.isFollowed)
    } catch (err) {
      console.log(err)
      let message = '操作失败，请重试！'
      if (err.response && err.response.status === 400) {
        message = '你不能关注自己！'
      }
      this.$toast(message)
    }
    this.loading = false // 关闭关注按钮的 loading 状态
   }
  }
}
</script>

<style scoped lang="less">

</style>
