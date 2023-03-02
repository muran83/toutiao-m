<template>
    <div class="search-suggestion">
      <van-cell title="黑马程序员搜索建议" icon="search" />
      <van-cell title="黑马程序员搜索建议" icon="search" />
      <van-cell title="黑马程序员搜索建议" icon="search" />
    
    </div>
  </template>
  
  <script>
  export default {
    name: 'SearchSuggestion',
    components: {},
    props: {
      searchText: {
        type: String,
        required: true
      }
    },
    data () {
      return {}
    },
    computed: {},
    watch: {
      searchText: {
        handler (val) {
          console.log('aaaaa')
        },
        immediate: true // 首次监视触发 ，第一次往输入框输入一个字符的时候才渲染出搜索建议组件然后才调用，immediate可以立即调用
      }
    },
    created () {},
    mounted () {},
    methods: {}
  }
  </script>
  
  <style scoped lang="less"></style>