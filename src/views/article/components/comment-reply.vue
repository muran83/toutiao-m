<template>
    <div class="comment-reply">
      <van-nav-bar
      :title="comment.reply_count > 0 ? `${comment.reply_count}条回复` : '暂无回复'"
      >
      <van-icon slot="left" name="cross" @click="$emit('close', false)"/>
      </van-nav-bar>
      <!-- 当前评论项 -->
      <comment-item :comment="comment" />
      <!-- /当前评论项 -->

      <!-- 评论的回复列表 -->
      <van-cell title="所有回复" />
      <comment-list
        :source="comment.com_id"
        type="c"
   	  />
       <!-- /评论的回复列表 -->

      <!-- 底部 -->
    <!-- /底部 -->
    </div>
  </template>
  
  <script>
  import CommentItem from './comment-item'
  import CommentList from './comment-list'
  export default {
    name: 'CommentReply',
    components: {
      CommentItem,
      CommentList
    },
    props: {
      comment: {
        type:Object,
        required: true
      }
    },
    data () {
      return {}
    },
    computed: {},
    watch: {},
    created () {},
    mounted () {},
    methods: {}
  }
  </script>
  
  <style scoped></style>