<template>
      <!--
      List 列表组件：瀑布流滚动加载，用于展示长列表。

      List 组件通过 loading 和 finished 两个变量控制加载状态，
      当组件初始化或滚动到到底部时，会触发 load 事件并将 loading 自动设置成 true，此时可以发起异步操作并更新数据，
      数据更新完毕后，将 loading 设置成 false 即可。
      若数据已全部加载完毕，则直接将 finished 设置成 true 即可。

      - load 事件：
        + List 初始化后会触发一次 load 事件，用于加载第一屏的数据。
        + 如果一次请求加载的数据条数较少，导致列表内容无法铺满当前屏幕，List 会继续触发 load 事件，直到内容铺满屏幕或数据全部加载完成。

      - loading 属性：控制加载中的 loading 状态
        + 非加载中，loading 为 false，此时会根据列表滚动位置判断是否触发 load 事件（列表内容不足一屏幕时，会直接触发）
        + 加载中，loading 为 true，表示正在发送异步请求，此时不会触发 load 事件

      - finished 属性：控制加载结束的状态
        + 在每次请求完毕后，需要手动将 loading 设置为 false，表示本次加载结束
        + 所有数据加载结束，finished 为 true，此时不会触发 load 事件
     -->
    <div class="article-list">
      <van-pull-refresh 
      v-model="isRefreshLoading" 
      :success-text="refreshSuccessText"
      :success-duration="1500"
      @refresh="onRefresh"
      >
        <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            :error.sync="error"
            error-text="请求失败，点击重新加载"
            @load="onLoad"
            >
            <article-item
              v-for="(article, index) in list" 
              :key="index"
              :article="article"
            />
        </van-list>
      </van-pull-refresh>

    </div>
  </template>
  
  <script>
  import { getArticles } from '@/api/article'
  import ArticleItem from '@/components/article-item'
import { deleteUserChannel } from '../../../api/channel'
import { set } from 'vue'

  export default {
    name: 'ArticleList',
    components: {
      ArticleItem
    },
    props: {
      channel: {
        type: Object,
        required: true
      }
    },
    data () {
      return {
      list: [], // 文章列表数据
      loading: false, // 底部上拉加载更多的 loading 状态
      finished: false, // 是否加载结束
      timestamp: null, // 请求获取下一页的时间戳
      error: false,  // 控制列表加载失败的提示状态
      isRefreshLoading: false, // 头部控制上拉刷新的状态显示
      refreshSuccessText: '' //  头部下拉刷新失败时候展示的文本内容
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
          timestamp: this.timestamp || Date.now(),
          // with_top: 1 // 是否包含置顶，进入页面第一次请求时要包含置顶文章，1-包含置顶，0-不包含
        })
        console.log(data)
        const results = data.data.results
        this.list.push( ...results)
        // 用随机数去模拟失败的情况
        // if ( Math.random() > 0.5 ) {
        //   JSON.parse(awdawda) 
        // }

        // 当页面没有渲染任何数据的时候，会不断的触发onLoad事件，这样会一直请求数据
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
        // 失败处理
        this.error = true
        // 当失败时，需要将loading设置为 false
        this.loading = false
      }

    },
   async onRefresh() {
    try {
      const { data } = await getArticles({
          channel_id: this.channel.id, // 频道 id
          timestamp: Date.now(), //只需要获取当前时间的时间戳
      })
      console.log(data.data,'111111111111111')
        // 模拟出错的情况 
        // if ( Math.random() > 0.5 ) {
        //   JSON.parse('awdawda') 
        // }
      // 用unshift去追加数据到头部
      const { results } = data.data
      this.list.unshift(...results)
      // 将上拉的状态设置为 true
      this.isRefreshLoading = false
      // 更新下拉刷新成功提示的文本
      this.refreshSuccessText = `刷新成功更新了${results.length}条数据`

    } catch (err) {
      console.log('上拉请求出错了，请稍后再试', err)
      this.refreshSuccessText = '刷新失败'
      this.isRefreshLoading = false
     }
   },
   async deleteChannel (channel) {
    try {
      if (this.user) {
        // 已经登录，将数据存储到线上
        await deleteUserChannel(channel.id)
      } else {
        // 未登录，将数据存储到本地
        setItem('TOUTIAO_CHANNELS',this.myChannels)
      }
    } catch (err) {
      console.log(err)
      this.$toast('删除频道失败，请稍后再试')
    }
   }
  }
  
  }
  </script>
<style scoped lang="less">
.article-list {
  // 百分比单位是相对于父元素的
  // height: 100%;

// 视口（在移动端是布局视口）单位：vw 和 vh，不受父元素影响
  // 1vw = 视口宽度的百分之一
  // 1vh = 视口高度的百分之一
  height: 79vh;
  overflow-y: auto;
}
</style>