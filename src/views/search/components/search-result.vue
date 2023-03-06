<template>
    <div class="search-result">
      <van-list
        v-model="loading"
        :finished="finished"
        :error.sync="error"
        error-text="加载失败，请点击重试"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <van-cell 
        v-for="(article, index) in list" 
        :key="index" 
        :title="article.title" 
        :to="{
          name: 'article',
          params: {
            articleId: article.art_id
          }
        }"
        
        />
      </van-list>
    </div>
  </template>
  
  <script>
  import { getSuggestionsResult } from '@/api/search'
  export default {
    name: 'SearchResult',
    components: {},
    props: {
      searchText: {
        type: String,
        required: true
      }
    },
    data () {
      return {
        list: [],
        loading: false,
        finished: false,
        page: 1,
        per_page: 20,
        error: false
      }
    },
    computed: {},
    watch: {},
    created () {},
    mounted () {},
    methods: {
      async onLoad () {
      // 1. 请求获取数据
       try {
        const { data } = await getSuggestionsResult({
        page: this.page, // 页码
        per_page: this.perPage, // 每页大小
        q: this.searchText // 搜索关键字
      })

      // 2. 将数据添加到列表中
      const { results } = data.data
      this.list.push(...results)

      // 3. 设置加载状态结束
      this.loading = false

      // 4. 判断数据是否加载完毕
      if (results.length) {
        this.page++ // 更新获取下一页数据的页码
      } else {
        this.finished = true // 没有数据了，将加载状态设置结束，不再 onLoad
      }
    } catch (err) {
        this.error = true // 展示加载失败的滚动条 
        this.loading = false // 加载失败 loading滚动条也要关闭
       } 
    }
  }
}
  
  </script>
  
  <style scoped lang="less"></style>