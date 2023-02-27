<template>
    <div class="article-list">
        <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
            >
            <van-cell v-for="(article, index) in list" :key="index" :title="article.title" />
        </van-list>
    </div>
  </template>
  
  <script>
  import { getArticles } from '@/api/article'
  export default {
    name: 'ArticleList',
    components: {},
    props: {
      channel: {
        type: Object,
        required: true
      }
    },
    data () {
      return {
      list: [], // 文章列表数据
      loading: false, // 上拉加载更多的 loading 状态
      finished: false, // 是否加载结束
      }
    },
    computed: {},
    watch: {},
    created () {},
    mounted () {},
    methods: {
        // 当触发上拉加载更多的时候调用该函数
    async onLoad () {
      try {
        // 1. 请求获取数据
        const { data } = await getArticles({
          channel_id: this.channel.id, // 频道 id
          // 时间戳，请求新的推荐数据传当前的时间戳，请求历史推荐传指定的时间戳
          // 第一次获取数据时，传递Date.now()； 后续翻页传递this.timestamp (这个后续有处理)
          timestamp: Date.now(),
          // with_top: 1 // 是否包含置顶，进入页面第一次请求时要包含置顶文章，1-包含置顶，0-不包含
        })
        console.log(data)
        const results = data.data.results
        this.list.push( ...results)
        // 3. 设置本次加载中 loading 状态结束
        this.loading = false
         // 4. 判断数据是否加载结束
         if (results.length) {
          // 更新获取下一页数据的时间戳
          this.timestamp = data.data.pre_timestamp
        } else {
          // 没有数据了，设置加载状态结束，不再触发上拉加载更多了
          this.finished = true
        }
        

    
      } catch (err) {
        console.log(err)
      }

    },
    }
  
  }
  </script>
  
  <style scoped lang="less"></style>