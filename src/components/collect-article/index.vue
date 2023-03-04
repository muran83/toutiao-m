<template>
    <van-button
    :icon="value ? 'star' : 'star-o'"
    :class="{
      collected: value
    }"
    @click="onCollect"
    :loading="loading"
    />
</template>
  
  <script>
  import { addCollect, deleteCollect } from '@/api/article'
  export default {
    name: 'CollectArticle',
    data() {
        return {
            loading: false, // 管理加载转圈状态
        }
    },
    props: {
        value: {
            type: Boolean,
            required: true
        },
        articleId: {
            type: [String, Number, Object]
        }
    },
    created(){

    },
    methods: {
       async onCollect () {
        this.loading = true
        try {
            if(this.value) {
            // 如果已经收藏，那么取消
                await deleteCollect(this.articleId)
            } else {
                await addCollect(this.articleId)
            }
            // 更新视图
            this.$emit('input', !this.value)
            this.$toast.success(status === 1 ? '收藏成功' : '取消收藏')
        } catch (err) {
            this.$toast.fail('操作失败，请重试')
        }
        // 请求结束
        this.loading = false
       }
    }
  }
  </script>
  
  <style scoped lang='less'>
  .collected {
    .van-icon {
    color: #ffa500;
  }
}
  </style>