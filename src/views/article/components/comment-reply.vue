<template>
    <div class="comment-reply">
      <van-nav-bar
      :title="comment.reply_count > 0 ? `${comment.reply_count}条回复` : '暂无回复'"
      >
      <van-icon slot="left" name="cross" @click="$emit('close', false)"/>
      </van-nav-bar>
      <div class="scroll-wrap">
        <!-- 当前评论项 -->
        <comment-item :comment="comment" />
        <!-- /当前评论项 -->

        <!-- 评论的回复列表 -->
        <van-cell title="所有回复" />
        <comment-list
          :source="comment.com_id"
          :list="commentList" 
          :type="c"
   	    />
         <!-- /评论的回复列表 -->
      </div>

      <!-- 发布评论 -->
        <div class="post-wrap">
          <van-button 
          class="post-btn" 
          size="small" 
          round 
          @click='isPostShow = true'>写评论</van-button>
        </div>
      <!-- /发布评论 -->

      <!-- 发布评论的弹层，视频里面没有提到，自行补充 -->
      <van-popup v-model="isPostShow" position="bottom">
        <comment-post  
        :target="comment.com_id"
        @post-success="onPostSuccess"
        />
      </van-popup>
    </div>
  </template>
  
  <script>
  import CommentItem from './comment-item'
  import CommentList from './comment-list'
  import CommentPost from './comment-post'
  export default {
    name: 'CommentReply',
    components: {
      CommentItem,
      CommentList,
      CommentPost,
    },
    props: {
      comment: {
        type:Object,
        required: true
      }
    },
    data () {
      return {
        isPostShow: false,
        commentList: [] // 评论的回复列表
      }
    },
    computed: {},
    watch: {},
    created () {},
    mounted () {},
    methods: {
      onPostSuccess(data) {
        // 更新回复的数量
        this.comment.reply_count++
        // 关闭弹层
        this.isPostShow = false
        // 将最新的内容填充到头部
        // console.log(this.commentList)
        this.commentList.unshift(data.new_obj)

      }
    }
  }
  </script>
  
  <style scoped lang="less">
    .post-wrap {
      background-color: pink;
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      height: 88px;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #fff;
      .post-btn {
        width: 60%;
        border-top: 1px solid #d8d8d8;
        }
    }
    .scroll-wrap {
      position: fixed;
      top: 92px;
      left: 0;
      right: 0;
      bottom: 88px;
      overflow-y: auto;
    }

  </style>