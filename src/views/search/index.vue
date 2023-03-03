<template>
    <!-- 搜索栏 -->
  <div class="search-container">
    <form class="search-form" action="/">
      <van-search
       v-model="searchText"
       show-action
       placeholder="请输入搜索关键词"
       background="#3296fa"
       @search="onSearch"
       @cancel="onCancel"
       @focus="isResultShow = false"
     />
  </form>
  <!-- /搜索栏 -->
    <!-- 搜索结果 -->
    <search-result 
    v-if="isResultShow"
    :searchText="searchText"
    />
  <!-- /搜索结果 -->

    <!-- 联想建议 -->
    <search-suggestion 
      v-else-if="searchText"
      :search-text="searchText"
      @search="onSearch"
    />
  <!-- /联想建议 -->

  <!-- 搜索历史记录 -->
   <search-history v-else/>
  <!-- /搜索历史记录 -->





  </div>
</template>

<script>
import SearchHistory from './components/search-history'
import SearchSuggestion from './components/search-suggestion'
import SearchResult from './components/search-result'

export default {
  // 组件名称
  name: 'SearchIndex',
  // 局部注册的组件
  components: {
    SearchHistory,
    SearchSuggestion,
    SearchResult,
  },
  // 组件参数 接收来自父组件的数据
  props: {},
  // 组件状态值
  data () {
    return {
        searchText: '', // 搜索框的输入内容
        isResultShow: false, // 用于展示搜索结果
        searchHistories: [], //存储搜索历史记录
    }
  },
  // 计算属性
  computed: {},
  // 侦听器
  watch: {
    
  },
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
    onSearch(val) {
      this. searchText = val
      const index =this.searchHistories.indexOf(val)
      if( index !== -1 ) {
        // 索引不等于-1  说明该关键词已经存在于搜索历史记录里面，需要先删除
        this.searchHistories.splice(index, 1)
      }
      this.searchHistories.unshift( val )
      this.isResultShow = true
    },
    onCancel() {
        this.$router.back()
    },
  }
}
</script>

<style scoped lang="less">
  .search-container {
    padding-top: 108px;
    .van-search__action {
        color: #fff;
    }
    .search-form {
      position: fixed;
      left: 0;
      top: 0;
      right: 0;
      z-index: 1;
    }
  }

</style>
