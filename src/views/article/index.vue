<template>
    <div class="article-container">
      <!-- 导航栏 -->
      <van-nav-bar
        class="page-nav-bar"
        left-arrow
        @click-left="$router.back()"
        title="黑马头条"
      ></van-nav-bar>
      <!-- /导航栏 -->
  
      <div class="main-wrap">
        <!-- 加载中 -->
        <div v-if="loading" class="loading-wrap">
          <van-loading
            color="#3296fa"
            vertical
          >加载中</van-loading>
        </div>
        <!-- /加载中 -->
  
        <!-- 加载完成-文章详情 -->
        <div v-else-if="article.title" class="article-detail">
          <!-- 文章标题 -->
          <h1 class="article-title">{{ article.title }}</h1>
          <!-- /文章标题 -->
  
          <!-- 用户信息 -->
          <van-cell  class="user-info" center :border="false">
            <van-image
              class="avatar"
              slot="icon"
              round
              fit="cover"
              :src="article.aut_photo"
            />
            <div slot="title" class="user-name">{{ article.aut_name }}</div>
            <div slot="label" class="publish-date">{{ article.pubdate | relativeTime }}</div>
            <follow-user class="follow-btn" 
            :is-followed="article.is_followed" 
            :userId="article.aut_id"
            @update-is-followed=" article.is_followed = $event"
            />
            <!-- <van-button
            v-if="article.is_followed"
              class="follow-btn"
              round
              :loading="followLoading"
              size="small"
              @click="onFollow"
            >已关注</van-button>
            <van-button
            v-else
              class="follow-btn"
              type="info"
              color="#3296fa"
              round
              :loading="followLoading"
              size="small"
              icon="plus"
              @click="onFollow"
            >关注</van-button> -->

          </van-cell>
          <!-- /用户信息 -->
  
          <!-- 文章内容 -->
          <div 
          ref="article-content"
          class="article-content markdown-body" 
          v-html="article.content"
          ></div>
          <van-divider>正文结束</van-divider>
        </div>
        <!-- /加载完成-文章详情 -->
  
        <!-- 加载失败：404 -->
        <div v-else-if="errStatus === 404" class="error-wrap">
          <van-icon name="failure" />
          <p class="text">该资源不存在或已删除！</p>
        </div>
        <!-- /加载失败：404 -->
  
        <!-- 加载失败：其它未知错误（例如网络原因或服务端异常） -->
        <div v-else class="error-wrap">
          <van-icon name="failure" />
          <p class="text">内容加载失败！</p>
          <van-button @click="loadArticle" class="retry-btn">点击重试</van-button>
        </div>
        <!-- /加载失败：其它未知错误（例如网络原因或服务端异常） -->
      </div>
  
      <!-- 底部区域 -->
     <div class="article-bottom">
        <van-button class="comment-btn" type="default" round size="small">写评论
        </van-button>
        <van-icon class="comment-icon" name="comment-o" badge="123" />
        <van-button class="btn-item" icon="star-o" />
        <van-button class="btn-item" icon="good-job-o" />
        <van-icon name="share" color="#777777"></van-icon>
      </div>
      <!-- /底部区域 -->
    </div>
  </template>
  
  <script>
  import { getArticleById } from '@/api/article'
  import { ImagePreview } from 'vant'
  import FollowUser from '@/components/follow-user'
  export default {
    name: 'ArticleIndex',
    components: {
      FollowUser
    },
    props: {
      articleId: {
        type: [Number, String],
        required: true
      }
    },
    data () {
      return {
        article: {}, // 文章详情 
        loading: true, // 定义点击进入文章时的加载状态
        errStatus: 0, // 错误状态码
        followLoading: false, 
      }
    },
    computed: {},
    watch: {},
    created () {
      this.loadArticle()
    },
    mounted () {},
    methods: {
     async loadArticle() {
      this.loading = true // 每一次点击进入文章的时候都要开启loading
      try {
        // if (Math.random() > 0.5) {
        //   JSON.parse('this is err test')
        // }
        const { data } = await getArticleById(this.articleId)
        this.article = data.data
        /****** */
        console.log(data)
        
        // 当文章请求成功时，进行图片加载函数
        // 数据驱动视图是异步的
        setTimeout( () => this.previewImage(), 0)
      } 
      catch (err) {
        if (err.response && err.response.status === 404) {
            this.errStatus = 404
        }
        this.$toast('获取文章失败')
        console.log('文章请求错误', err)
      }
      // 请求无论成功或者失败都要修改loading的状态
     this.loading = false
    },
    previewImage() {
    // 1、 获取图片的DOM节点
    const articleContent = this.$refs['article-content']
    const imgs = articleContent.querySelectorAll('img')
    // 2、创建一个装在图片src的空数组，遍历imgs图片节点，将src装载新数组当中
    const images = []
    imgs.forEach((img, index) => {
      images.push(img.src)
      // 3、给图片DOM添加点击事件，触发图片加载函数
      img.onclick = () => {
          ImagePreview({
            // 预览的图片地址数组 注意：images属性名是固定的写法
            images,
            // 起始位置，从 0 开始
            startPosition: index
          })
        }
    })
   },
   
  }
}
  </script>
  
  <style scoped lang="less">
@import './github-markdown.css';
  .article-container {
    .main-wrap {
      position: fixed;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      background-color: #fff;
    }
    .article-detail {
      position: fixed;
      left: 0;
      right: 0;
      top: 92px;
      bottom: 88px;
      overflow-y: scroll;
      background-color: #fff;
      .article-title {
        font-size: 40px;
        padding: 50px 32px;
        margin: 0;
        color: #3a3a3a;
      }
  
      .user-info {
        padding: 0 32px;
        .avatar {
          width: 70px;
          height: 70px;
          margin-right: 17px;
        }
        .van-cell__label {
          margin-top: 0;
        }
        .user-name {
          font-size: 24px;
          color: #3a3a3a;
        }
        .publish-date {
          font-size: 23px;
          color: #b7b7b7;
        }
        .follow-btn {
          width: 170px;
          height: 58px;
        }
      }
  
      .article-content {
        padding: 55px 32px;
        /deep/ p {
          text-align: justify;
        }
      }
    }
  
    .loading-wrap {
      padding: 200px 32px;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: #fff;
    }
  
    .error-wrap {
      padding: 200px 32px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      background-color: #fff;
      .van-icon {
        font-size: 122px;
        color: #b4b4b4;
      }
      .text {
        font-size: 30px;
        color: #666666;
        margin: 33px 0 46px;
      }
      .retry-btn {
        width: 280px;
        height: 70px;
        line-height: 70px;
        border: 1px solid #c3c3c3;
        font-size: 30px;
        color: #666666;
      }
    }
  
    .article-bottom {
      position: fixed;
      left: 0;
      right: 0;
      bottom: 0;
      display: flex;
      justify-content: space-around;
      align-items: center;
      box-sizing: border-box;
      height: 88px;
      border-top: 1px solid #d8d8d8;
      background-color: #fff;
      .comment-btn {
        width: 282px;
        height: 46px;
        border: 2px solid #eeeeee;
        font-size: 30px;
        line-height: 46px;
        color: #a7a7a7;
      }
      /deep/ .van-icon {
        font-size: 40px;
      }
      .comment-icon {
        top: 2px;
        color: #777;
        .van-info {
          font-size: 16px;
          background-color: #e22829;
        }
      }
      .btn-item {
        border: none;
        padding: 0;
        height: 40px;
        line-height: 40px;
        color: #777777;
      }
      .collect-btn--collected {
        color: #ffa500;
      }
      .like-btn--liked {
        color: #e5645f;
      }
    }
  }
  </style>