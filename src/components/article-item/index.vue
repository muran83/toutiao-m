  <template>
    <van-cell 
    class="article-item"
    :to="{
      name: 'article',
      params: {
        articleId: article.art_id
      }
    }"
    >
      <div slot="title" class="title van-multi-ellipsis--l2">{{ article.title }}</div>
      <div slot="label">
        <!-- 三张图片的显示情况 -->
        <div v-if="article.cover.type === 3 " class="cover-wrap">
          <div class="cover-item" v-for="(imgSrc, index) in article.cover.images" :key="index ">
            <van-image
            class="cover-item-img"
            slot="default"
            :src="imgSrc"
            fit="cover"
         />
          </div>
        </div>
        <div class="label-info-wrap">
          <span slot="label">{{ article.aut_name}}</span>
          <span slot="label">{{ article.comm_count}}条评论</span>
          <span slot="label">{{ article.pubdate | relativeTime }}</span> <!-- relativeTime是过滤器-->
        </div>
      </div>
      <!-- 一张图片的情况 -->
      <div 
      class="right-cover" 
      slot="default" 
      v-if="article.cover.type === 1">
        <van-image
          fit="cover"
          slot="default"
          :src="article.cover.images[0]"
         />
      </div>

  </van-cell>
    
    
  </template>
  
  <script>
  export default {
    name: 'ArticleItem',
    components: {},
    props: {
      article: {
        type: Object,
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
  
  <style scoped lang="less">
  .article-item {
    .title {
      font-size: 32px;
      color: #3a3a3a;
    }

    .van-cell__value {
      flex: unset;
      width: 232px;
      height: 146px;
      padding-left: 25px;
    }
    .right-cover {
      width: 232px;
      height: 146px;
    }
    .label-info-wrap span {
      font-size: 22px;
      color: #b4b4b4;
      margin-right: 25px;
    }
    .cover-wrap {
      padding: 30px 0;
      display: flex;
      .cover-item {
        flex: 1;
        height: 146px;
        &:not(:last-child) {
          padding-right: 4px;
        }
        .cover-item-img {
          width: 100%;
          height: 146px;
        }
      }
    }
  }
  </style>