<template>
    <van-button
      :icon="value === 1 ? 'good-job' : 'good-job-o'"
      :class="{liked: value === 1}"
      @click="onCollect"
      :loading="loading"
    />
  </template>
  
  <script>
import { addLike, deleteLike } from '@/api/article'
export default {
  name:"LikeArticle",
  components: {},
  props: {
    value: {
      type: Number,
      required: true
    },
    articleId: {
      type: [Number, String, Object],
      required: true
    }
  },
  data() {
    return {
      loading: false
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
   async onCollect() {
      this.loading = true
        try {
          let status = -1
        if (this.value === 1) {
          // 已经点赞，取消点赞
          await deleteLike(this.articleId)
        } else {
          await addLike(this.articleId)
          status = 1
        }
        // 更新视图
        this.$emit('input', status)
        this.$toast(status === 1 ? '点赞成功' : '取消点赞')
      } catch (err) {
        this.$toast.fail('操作失败，请重试')
      }
       // 请求结束
       this.loading = false

    }
  }
};
  </script>

  
  <style scoped lang="less">
  .liked {
    .van-icon {
      color: #e5645f!important;
    }
  }
  </style>