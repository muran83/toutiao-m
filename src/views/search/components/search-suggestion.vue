<template>
    <div class="search-suggestion">
      <van-cell 
      v-for="(suggestion, index) in suggestions" 
      :key="index" 
      :title="suggestion" 
      icon="search" />
    </div>
  </template>
  
  <script>
  import { searchSuggestions } from '@/api/search'
  import { debounce } from 'lodash'
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
      return {
        suggestions: []
      }
    },
    computed: {},
    watch: {
      searchText: {
        handler (val) {
          this.loadSearchSuggestions(val)
        },
        immediate: true // 首次监视触发 ，第一次往输入框输入一个字符的时候才渲染出搜索建议组件然后才调用，immediate可以立即调用
      }
    },
    created () {},
    mounted () {},
    methods: {
      async loadSearchSuggestions (q) {
        try {
          const { data } = await searchSuggestions(q)
          console.log(data,'搜索联想建议')
          this.suggestions = data.data.options
        } catch (err) {
          this.$toast('获取搜索建议失败，请稍后再试')
        }
      }
    }
  }
  </script>
  
  <style scoped lang="less"></style>